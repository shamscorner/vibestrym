import {
	BadRequestException,
	ConflictException,
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { verify } from 'argon2'
import type { Request } from 'express'
import type { SessionData } from 'express-session'

import { PrismaService } from '@/src/core/prisma/prisma.service'
import { RedisService } from '@/src/core/redis/redis.service'
import { generateTotp } from '@/src/shared/utils/generate-totp.util'
import { getSessionMetadata } from '@/src/shared/utils/session-metadata.util'
import {
	destroySession,
	getSessionIdWithSessionFolder,
	getUserSessionsKey,
	saveSession
} from '@/src/shared/utils/session.util'

import { VerificationService } from '../verification/verification.service'

import { LoginInput } from './inputs/login.input'

type SessionDataInRedis = SessionData & {
	id: string
}

@Injectable()
export class SessionService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly configService: ConfigService,
		private readonly redisService: RedisService,
		private readonly verificationService: VerificationService
	) {}

	async findByUser(req: Request) {
		const userId = req.session.userId

		if (!userId) {
			throw new NotFoundException('User not found in session')
		}

		// Use Redis set to track user sessions for O(1) lookup
		const userSessionsKey = getUserSessionsKey(userId)
		const sessionIds = await this.redisService.smembers(userSessionsKey)

		if (sessionIds.length === 0) return []

		// Use batch operations with error handling
		const sessionKeys = sessionIds.map(id =>
			getSessionIdWithSessionFolder(this.configService, id)
		)
		const pipeline = this.redisService.pipeline()
		sessionKeys.forEach(key => pipeline.get(key))

		const results = await pipeline.exec()
		const userSessions: SessionDataInRedis[] = []

		if (!results) return []

		for (let i = 0; i < results.length; i++) {
			const [error, sessionData] = results[i]

			if (!error && sessionData) {
				try {
					const session = JSON.parse(
						sessionData as string
					) as SessionData
					userSessions.push({
						...session,
						id: sessionIds[i]
					})
				} catch {
					// Remove invalid session from tracking set
					await this.redisService.srem(userSessionsKey, sessionIds[i])
				}
			} else if (error) {
				// Remove non-existent session from tracking set
				await this.redisService.srem(userSessionsKey, sessionIds[i])
			}
		}

		// Sort by timestamp (more efficient comparison)
		userSessions.sort((a, b) => {
			const aTime = this.getTimestamp(a.createdAt)
			const bTime = this.getTimestamp(b.createdAt)
			return bTime - aTime
		})

		// Filter out current session
		return userSessions.filter(session => session.id !== req.session.id)
	}

	async findCurrent(req: Request) {
		const sessionId = req.session.id
		const session = await this.getSessionFromSessionId(sessionId)

		return {
			...session,
			id: sessionId
		}
	}

	async login(request: Request, input: LoginInput, userAgent: string) {
		const { login, password, pin } = input

		const user = await this.prismaService.user.findFirst({
			where: {
				OR: [
					{ username: { equals: login } },
					{ email: { equals: login } }
				]
			}
		})

		if (!user) {
			throw new NotFoundException('User not found')
		}

		const isValidPassword = await verify(user.password, password)

		if (!isValidPassword) {
			throw new UnauthorizedException('Invalid password')
		}

		if (!user.isEmailVerified) {
			await this.verificationService.sendVerificationToken(user)

			throw new BadRequestException(
				'Account not verified. Please check your email for confirmation'
			)
		}

		console.log('is TOTP enabled:', user.isTotpEnabled)
		if (user.isTotpEnabled) {
			console.log('pin', pin)
			if (!pin) {
				return {
					user: null,
					message: 'Code required to complete login'
				}
			}

			const totp = generateTotp(
				this.configService,
				user.email,
				user.totpSecret || undefined
			)

			const delta = totp.validate({ token: pin })

			if (delta === null) {
				throw new BadRequestException('Invalid code')
			}
		}

		const metadata = getSessionMetadata(request, userAgent)

		return saveSession(this.redisService, request, user, metadata)
	}

	async logout(request: Request) {
		const userId = request.session.userId
		if (!userId) return true

		console.log('Destroying session for user:', userId)

		return destroySession(
			this.redisService,
			request,
			userId,
			this.configService
		)
	}

	clearSession(req: Request) {
		req.res?.clearCookie(
			this.configService.getOrThrow<string>('SESSION_NAME')
		)
		return true
	}

	async remove(req: Request, id: string) {
		if (req.session.id === id) {
			throw new ConflictException('Cannot delete the current session')
		}

		// Remove from session storage and user tracking
		const userId = req.session.userId
		const pipeline = this.redisService.pipeline()
		pipeline.del(getSessionIdWithSessionFolder(this.configService, id))

		if (userId) {
			pipeline.srem(getUserSessionsKey(userId), id)
		}

		await pipeline.exec()
		return true
	}

	private async getSessionFromSessionId(
		sessionId: string
	): Promise<SessionData | null> {
		const sessionData = await this.redisService.get(
			getSessionIdWithSessionFolder(this.configService, sessionId)
		)
		return sessionData ? (JSON.parse(sessionData) as SessionData) : null
	}

	private getTimestamp(date?: string | number | Date): number {
		if (!date) return 0
		if (typeof date === 'number') return date
		if (typeof date === 'string') return new Date(date).getTime()
		return date.getTime()
	}
}
