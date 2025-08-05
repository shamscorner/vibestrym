import { ConfigService } from '@nestjs/config'

import { LiveKitOptions } from '@/src/modules/libs/livekit/types/livekit.types'

import { AppConfig } from './app.config'

export function getLiveKitConfig(configService: ConfigService): LiveKitOptions {
	const liveKitConfig =
		configService.getOrThrow<AppConfig['livekit']>('livekit')

	return {
		apiUrl: liveKitConfig?.apiUrl,
		apiKey: liveKitConfig?.apiKey,
		apiSecret: liveKitConfig?.apiSecret
	}
}
