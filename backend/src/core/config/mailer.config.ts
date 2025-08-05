import type { MailerOptions } from '@nestjs-modules/mailer'
import { ConfigService } from '@nestjs/config'

import { AppConfig } from './app.config'

export function getMailerConfig(configService: ConfigService): MailerOptions {
	const mailConfig = configService.getOrThrow<AppConfig['mail']>('mail')

	return {
		transport: {
			host: mailConfig.host,
			port: mailConfig.port,
			secure: false,
			auth: {
				user: mailConfig.login,
				pass: mailConfig.password
			}
		},
		defaults: {
			from: `"Vibestrym" ${mailConfig.from}`
		}
	}
}
