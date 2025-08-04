import { Provider } from '@nestjs/common'
import { ModuleMetadata, Type } from '@nestjs/common/interfaces'
import { RateLimiterRes } from 'rate-limiter-flexible'

export interface RateLimiterOptions {
	for?: 'Express' | 'Microservice' | 'ExpressGraphql'
	type?: 'Memory' | 'Redis'
	keyPrefix?: string
	points?: number
	pointsConsumed?: number
	inmemoryBlockDuration?: number
	duration?: number
	blockDuration?: number
	inmemoryBlockOnConsumed?: number
	queueEnabled?: boolean
	whiteList?: string[]
	blackList?: string[]
	storeClient?: any
	insuranceLimiter?: any
	execEvenly?: boolean
	execEvenlyMinDelayMs?: number
	indexKeyPrefix?: Record<string, unknown>
	maxQueueSize?: number
	omitResponseHeaders?: boolean
	errorMessage?: string
	logger?: boolean
	customResponseSchema?: (
		rateLimiterResponse: RateLimiterRes
	) => Record<string, unknown>
}

export interface RateLimiterOptionsFactory {
	createRateLimiterOptions(): Promise<RateLimiterOptions> | RateLimiterOptions
}

export interface RateLimiterModuleAsyncOptions
	extends Pick<ModuleMetadata, 'imports'> {
	useExisting?: Type<RateLimiterOptionsFactory>
	useClass?: Type<RateLimiterOptionsFactory>
	useFactory?: (
		...args: any[]
	) => Promise<RateLimiterOptions> | RateLimiterOptions
	inject?: any[]
	extraProviders?: Provider[]
}
