import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { render } from '@react-email/components'
import type { SentMessageInfo } from 'nodemailer'

import { SessionMetadata } from '@/src/shared/types/session-metadata.types'

import { AccountDeletionTemplate } from '../templates/account-deletion.template'
import { DeactivateTemplate } from '../templates/deactivate.template'
import { PasswordRecoveryTemplate } from '../templates/password-recovery.template'
import { VerificationTemplate } from '../templates/verification.template'

@Injectable()
export class MailService {
	constructor(
		private readonly mailerService: MailerService,
		private readonly configService: ConfigService
	) {}

	async sendVerificationToken(
		email: string,
		token: string
	): Promise<SentMessageInfo> {
		const domain = this.configService.getOrThrow<string>('ALLOWED_ORIGIN')
		const html = await render(VerificationTemplate({ domain, token }))
		return this.sendMail(email, 'Account Verification', html)
	}

	async sendPasswordResetToken(
		email: string,
		token: string,
		metadata: SessionMetadata
	): Promise<SentMessageInfo> {
		const domain = this.configService.getOrThrow<string>('ALLOWED_ORIGIN')
		const html = await render(
			PasswordRecoveryTemplate({ domain, token, metadata })
		)
		return this.sendMail(email, 'Password Reset', html)
	}

	async sendDeactivateToken(
		email: string,
		token: string,
		metadata: SessionMetadata
	): Promise<SentMessageInfo> {
		const html = await render(DeactivateTemplate({ token, metadata }))
		return this.sendMail(email, 'Account Deactivation', html)
	}

	async sendAccountDeletion(email: string): Promise<SentMessageInfo> {
		const domain = this.configService.getOrThrow<string>('ALLOWED_ORIGIN')
		const html = await render(AccountDeletionTemplate({ domain }))
		return this.sendMail(email, 'Account Deleted', html)
	}

	private sendMail(email: string, subject: string, html: string) {
		return this.mailerService.sendMail({
			to: email,
			subject,
			html
		})
	}
}
