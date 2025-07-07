import {
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { verify } from 'argon2'
import type { Request } from 'express'

import { PrismaService } from '@/src/core/prisma/prisma.service'
import { destroySession, saveSession } from '@/src/shared/utils/session.util'

import { LoginInput } from './inputs/login.input'

@Injectable()
export class SessionService {
	public constructor(
		private readonly prismaService: PrismaService,
		private readonly configService: ConfigService
	) {}

	public async login(request: Request, input: LoginInput) {
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

		return saveSession(request, user)
	}

	public async logout(request: Request) {
		return destroySession(request, this.configService)
	}
}
