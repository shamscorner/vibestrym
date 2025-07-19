import { ConfigService } from '@nestjs/config'

import { StripeOptions } from '@/src/modules/libs/stripe/types/stripe.types'

export function getStripeConfig(configService: ConfigService): StripeOptions {
	return {
		apiKey: configService.getOrThrow<string>('STRIPE_SECRET_KEY'),
		config: {
			apiVersion: '2025-06-30.basil'
		}
	}
}
