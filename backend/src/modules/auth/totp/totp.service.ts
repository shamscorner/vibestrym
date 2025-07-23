import { BadRequestException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { randomBytes } from 'crypto'
import { encode } from 'hi-base32'
import * as QRCode from 'qrcode'

import type { User } from '@/prisma/generated'
import { PrismaService } from '@/src/core/prisma/prisma.service'
import { generateTotp } from '@/src/shared/utils/generate-totp.util'

import { DisableTotpInput } from './inputs/disable-totp.input'
import { EnableTotpInput } from './inputs/enable-totp.input'

@Injectable()
export class TotpService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly configService: ConfigService
	) {}

	async generate(user: User) {
		const secret = encode(randomBytes(15))
			.replace(/=/g, '')
			.substring(0, 24)

		const totp = generateTotp(this.configService, user.email, secret)

		const otpauthUrl = totp.toString()
		const qrcodeUrl = await QRCode.toDataURL(otpauthUrl)

		return { qrcodeUrl, secret }
	}

	async enable(user: User, input: EnableTotpInput) {
		const { secret, pin } = input

		const totp = generateTotp(this.configService, user.email, secret)

		const delta = totp.validate({ token: pin })

		if (delta === null) {
			throw new BadRequestException('Invalid pin code')
		}

		await this.prismaService.user.update({
			where: {
				id: user.id
			},
			data: {
				isTotpEnabled: true,
				totpSecret: secret
			}
		})

		return true
	}

	async disable(user: User, input: DisableTotpInput) {
		const { pin } = input

		const totp = generateTotp(
			this.configService,
			user.email,
			user.totpSecret || undefined
		)

		const delta = totp.validate({ token: pin })

		if (delta === null) {
			throw new BadRequestException('Invalid code')
		}

		await this.prismaService.user.update({
			where: {
				id: user.id
			},
			data: {
				isTotpEnabled: false,
				totpSecret: null
			}
		})

		return true
	}

	private getTotpIssuer(): string {
		return this.configService.getOrThrow<string>('TOTP_ISSUER')
	}
}
