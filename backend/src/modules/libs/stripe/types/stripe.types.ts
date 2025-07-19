import type { FactoryProvider, ModuleMetadata } from '@nestjs/common'
import Stripe from 'stripe'

export const StripeOptionsSymbol = Symbol('StripeOptionsSymbol')

export type StripeOptions = {
	apiKey: string
	config?: Stripe.StripeConfig
}

export type StripeAsyncOptions = Pick<ModuleMetadata, 'imports'> &
	Pick<FactoryProvider<StripeOptions>, 'useFactory' | 'inject'>
