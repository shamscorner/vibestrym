import { InternalServerErrorException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import type { Request } from 'express'

import type { User } from '@/prisma/generated'

import type { SessionMetadata } from '../types/session-metadata.types'

export function saveSession(
	req: Request,
	user: User,
	metadata: SessionMetadata
) {
	return new Promise((resolve, reject) => {
		req.session.createdAt = new Date()
		req.session.userId = user.id
		req.session.metadata = metadata

		req.session.save(err => {
			if (err) {
				return reject(
					new InternalServerErrorException('Failed to save session')
				)
			}

			resolve(user)
		})
	})
}

export function destroySession(request: Request, configService: ConfigService) {
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

			resolve(true)
		})
	})
}
