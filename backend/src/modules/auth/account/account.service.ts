import { ConflictException, Injectable } from '@nestjs/common'
import { hash } from 'argon2'

import { PrismaService } from '@/src/core/prisma/prisma.service'

import { VerificationService } from '../verification/verification.service'

import { CreateUserInput } from './inputs/create-user.input'

@Injectable()
export class AccountService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly verificationService: VerificationService
	) {}

	async me(id: string) {
		return this.prismaService.user.findUnique({
			where: { id }
		})
	}

	async create(input: CreateUserInput) {
		const { username, email, password } = input

		const isUsernameExists = await this.prismaService.user.findUnique({
			where: { username }
		})

		if (isUsernameExists) {
			throw new ConflictException(`Username ${username} already exists`)
		}

		const isEmailExists = await this.prismaService.user.findUnique({
			where: { email }
		})

		if (isEmailExists) {
			throw new ConflictException(`Email ${email} already exists`)
		}

		const user = await this.prismaService.user.create({
			data: {
				username,
				email,
				password: await hash(password),
				displayName: username // Default display name is the username
			}
		})

		await this.verificationService.sendVerificationToken(user)

		return true
	}
}
