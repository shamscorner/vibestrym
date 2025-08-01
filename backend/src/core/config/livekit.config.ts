import { ConfigService } from '@nestjs/config'

import { LiveKitOptions } from '@/src/modules/libs/livekit/types/livekit.types'

export function getLiveKitConfig(configService: ConfigService): LiveKitOptions {
	return {
		apiUrl: configService.getOrThrow<string>('LIVEKIT_API_URL'),
		apiKey: configService.getOrThrow<string>('LIVEKIT_API_KEY'),
		apiSecret: configService.getOrThrow<string>('LIVEKIT_API_SECRET')
	}
}
