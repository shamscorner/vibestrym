import { ConfigService } from '@nestjs/config'
import { TOTP } from 'otpauth'

import { AppConfig } from '@/src/core/config/app.config'

export function generateTotp(
	configService: ConfigService,
	email: string,
	secret?: string
) {
	const totpConfig = configService.getOrThrow<AppConfig['totp']>('totp')

	return new TOTP({
		issuer: totpConfig.issuer,
		label: `${email}`,
		algorithm: 'SHA1',
		digits: 6,
		secret
	})
}
