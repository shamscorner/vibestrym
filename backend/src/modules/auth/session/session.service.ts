import {
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
import { getSessionMetadata } from '@/src/shared/utils/session-metadata.util'
import { destroySession, saveSession } from '@/src/shared/utils/session.util'

import { LoginInput } from './inputs/login.input'

type SessionDataInRedis = SessionData & {
	id: string
}

@Injectable()
export class SessionService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly configService: ConfigService,
		private readonly redisService: RedisService
	) {}

	async findByUser(req: Request) {
		const userId = req.session.userId

		if (!userId) {
			throw new NotFoundException('User not found in session')
		}

		// Use pattern matching to find sessions for this user
		const sessionFolder = this.getSessionFolder()
		const pattern = `${sessionFolder}*`
		const keys = await this.redisService.keys(pattern)

		const userSessions: SessionDataInRedis[] = []

		// Use pipeline for better performance when fetching multiple keys
		const pipeline = this.redisService.pipeline()
		keys.forEach(key => pipeline.get(key))
		const results = await pipeline.exec()

		for (let i = 0; i < keys.length; i++) {
			const sessionData = results?.[i]?.[1] as string | null

			if (sessionData) {
				const session = JSON.parse(sessionData) as SessionData

				if (session.userId === userId) {
					userSessions.push({
						...session,
						id: keys[i].replace(sessionFolder, '')
					})
				}
			}
		}

		const convertToTimestamp = (date?: string | number | Date) => {
			if (!date) return 0
			if (typeof date === 'string') return new Date(date).getTime()
			if (date instanceof Date) return date.getTime()
			return date
		}

		userSessions.sort(
			(a, b) =>
				convertToTimestamp(b.createdAt) -
				convertToTimestamp(a.createdAt)
		)

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
		const { login, password } = input

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

		const metadata = getSessionMetadata(request, userAgent)

		return saveSession(request, user, metadata)
	}

	async logout(request: Request) {
		return destroySession(request, this.configService)
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
		await this.redisService.del(this.getSessionIdWithSessionFolder(id))
		return true
	}

	private async getSessionFromSessionId(
		sessionId: string
	): Promise<SessionData | null> {
		const sessionData = await this.redisService.get(
			this.getSessionIdWithSessionFolder(sessionId)
		)
		return sessionData ? (JSON.parse(sessionData) as SessionData) : null
	}

	private getSessionFolder() {
		return this.configService.getOrThrow<string>('SESSION_FOLDER')
	}

	private getSessionIdWithSessionFolder(sessionId: string): string {
		return `${this.getSessionFolder()}${sessionId}`
	}
}
