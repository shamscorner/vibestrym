import { ConfigService } from '@nestjs/config'
import type { TelegrafModuleOptions } from 'nestjs-telegraf'

import { AppConfig } from './app.config'

export function getTelegrafConfig(
	configService: ConfigService
): TelegrafModuleOptions {
	const telegramConfig =
		configService.getOrThrow<AppConfig['telegram']>('telegram')

	return {
		token: telegramConfig.botToken
	}
}
