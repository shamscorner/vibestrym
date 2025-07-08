import { ConfigService } from '@nestjs/config'
import { TOTP } from 'otpauth'

export function generateTotp(
	configService: ConfigService,
	email: string,
	secret?: string
) {
	return new TOTP({
		issuer: configService.getOrThrow<string>('TOTP_ISSUER'),
		label: `${email}`,
		algorithm: 'SHA1',
		digits: 6,
		secret
	})
}
