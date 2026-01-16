import { ConfigService } from '@nestjs/config'

import { StripeOptions } from '@/src/modules/libs/stripe/types/stripe.types'

import { AppConfig } from './app.config'

export function getStripeConfig(configService: ConfigService): StripeOptions {
	const stripeConfig = configService.getOrThrow<AppConfig['stripe']>('stripe')

	return {
		apiKey: stripeConfig.secretKey,
		config: {
			apiVersion: '2025-12-15.clover'
		}
	}
}
