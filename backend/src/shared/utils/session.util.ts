import { InternalServerErrorException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import type { Request } from 'express'

import type { User } from '@/prisma/generated'
import { RedisService } from '@/src/core/redis/redis.service'

import type { SessionMetadata } from '../types/session-metadata.types'

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
				.then(() => resolve(user))
				.catch(() => resolve(user))
		})
	})
}

export function destroySession(
	redisService: RedisService,
	request: Request,
	userId: string,
	configService: ConfigService
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

			request.res?.clearCookie(
				configService.getOrThrow<string>('SESSION_NAME')
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
