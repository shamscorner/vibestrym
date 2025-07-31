import { InternalServerErrorException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import type { CookieOptions, Request } from 'express'

import type { User } from '@/prisma/generated'
import { RedisService } from '@/src/core/redis/redis.service'

import type { SessionMetadata } from '../types/session-metadata.types'

import { parseBoolean } from './parse-boolean.util'

export const USERS_SESSIONS_KEY = 'user_sessions'

export function getUserSessionsKey(userId: string): string {
	return `user_sessions:${userId}`
}

export function getSessionFolder(configService: ConfigService): string {
	return configService.getOrThrow<string>('SESSION_FOLDER')
}

export function getSessionIdWithSessionFolder(
	configService: ConfigService,
	sessionId: string
): string {
	return `${getSessionFolder(configService)}${sessionId}`
}

export function getSessionOptions(configService: ConfigService) {
	return {
		domain: configService.getOrThrow<string>('SESSION_DOMAIN'),
		path: '/', // Important: must match the original
		httpOnly: parseBoolean(
			configService.getOrThrow<string>('SESSION_HTTP_ONLY')
		),
		secure: parseBoolean(
			configService.getOrThrow<string>('SESSION_SECURE')
		),
		sameSite: 'lax'
	} as CookieOptions
}

export function saveSession(
	redisService: RedisService,
	request: Request,
	user: User,
	metadata: SessionMetadata
) {
	return new Promise((resolve, reject) => {
		request.session.createdAt = new Date()
		request.session.userId = user.id
		request.session.metadata = metadata

		request.session.save(err => {
			if (err) {
				return reject(
					new InternalServerErrorException('Failed to save session')
				)
			}

			redisService
				.sadd(`${USERS_SESSIONS_KEY}:${user.id}`, request.session.id)
				.then(() => resolve({ user }))
				.catch(() => resolve({ user }))
		})
	})
}

export function destroySession(
	configService: ConfigService,
	redisService: RedisService,
	request: Request,
	userId: string
) {
	// Store sessionId to use after session destruction
	const sessionId = request.session.id

	return new Promise((resolve, reject) => {
		request.session.destroy(err => {
			if (err) {
				return reject(
					new InternalServerErrorException(
						'Failed to destroy session'
					)
				)
			}

			// Clear cookie with the SAME options used when setting it
			request.res?.clearCookie(
				configService.getOrThrow<string>('SESSION_NAME'),
				getSessionOptions(configService)
			)

			redisService
				.srem(`${USERS_SESSIONS_KEY}:${userId}`, sessionId)
				.then(() => {
					resolve(true)
				})
				.catch(() => {
					resolve(true)
				})
		})
	})
}

export async function clearUserSessions(
	configService: ConfigService,
	redisService: RedisService,
	userId: string
) {
	const userSessionsKey = getUserSessionsKey(userId)

	// Get all session IDs for the user
	const sessionIds = await redisService.smembers(userSessionsKey)

	// Delete each individual session
	if (sessionIds.length > 0) {
		const sessionKeys = sessionIds.map(sessionId =>
			getSessionIdWithSessionFolder(configService, sessionId)
		)
		await redisService.del(...sessionKeys)
	}

	// Delete the user's session set
	await redisService.del(userSessionsKey)
}
