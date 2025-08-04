/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
	CanActivate,
	ExecutionContext,
	HttpException,
	HttpStatus,
	Inject,
	Injectable,
	Logger
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import {
	IRateLimiterStoreOptions,
	RateLimiterAbstract,
	RateLimiterMemory,
	RateLimiterQueue,
	RateLimiterRedis,
	RateLimiterRes,
	RLWrapperBlackAndWhite
} from 'rate-limiter-flexible'

import { defaultRateLimiterOptions } from '../default-options'
import { RateLimiterOptions } from '../rate-limiter.interface'

@Injectable()
export class RateLimiterGuard implements CanActivate {
	private rateLimiters: Map<string, RateLimiterAbstract> = new Map()
	private specificOptions: RateLimiterOptions | null = null
	private queueLimiter: RateLimiterQueue | null = null

	constructor(
		@Inject('RATE_LIMITER_OPTIONS') private options: RateLimiterOptions,
		@Inject('Reflector') private readonly reflector: Reflector
	) {}

	getRateLimiter(options?: RateLimiterOptions): Promise<RateLimiterAbstract> {
		this.options = { ...defaultRateLimiterOptions, ...this.options }
		this.specificOptions = null
		this.specificOptions = options || null

		const limiterOptions: RateLimiterOptions = {
			...this.options,
			...options
		}

		const { ...libraryArguments } = limiterOptions

		let rateLimiter: RateLimiterAbstract | undefined =
			libraryArguments.keyPrefix
				? this.rateLimiters.get(libraryArguments.keyPrefix)
				: undefined

		if (libraryArguments.execEvenlyMinDelayMs === undefined)
			libraryArguments.execEvenlyMinDelayMs =
				((this.options.duration || 10) * 1000) /
				(this.options.points || 1)

		if (!rateLimiter) {
			const logger = this.specificOptions?.logger || this.options.logger
			switch (this.specificOptions?.type || this.options.type) {
				case 'Memory':
					rateLimiter = new RateLimiterMemory(libraryArguments)
					if (logger) {
						Logger.log(
							`Rate Limiter started with ${limiterOptions.keyPrefix} key prefix`,
							'RateLimiterMemory'
						)
					}
					break
				case 'Redis':
					rateLimiter = new RateLimiterRedis(
						libraryArguments as IRateLimiterStoreOptions
					)
					if (logger) {
						Logger.log(
							`Rate Limiter started with ${limiterOptions.keyPrefix} key prefix`,
							'RateLimiterRedis'
						)
					}
					break
				default:
					throw new Error(
						`Invalid "type" option provided to RateLimiterGuard. Value was ${limiterOptions.type}`
					)
			}

			this.rateLimiters.set(limiterOptions.keyPrefix!, rateLimiter)
		}

		if (this.specificOptions?.queueEnabled || this.options.queueEnabled) {
			this.queueLimiter = new RateLimiterQueue(rateLimiter, {
				maxQueueSize:
					this.specificOptions?.maxQueueSize ||
					this.options.maxQueueSize
			})
		}

		rateLimiter = new RLWrapperBlackAndWhite({
			limiter: rateLimiter,
			whiteList:
				this.specificOptions?.whiteList || this.options.whiteList,
			blackList:
				this.specificOptions?.blackList || this.options.blackList,
			runActionAnyway: false
		})

		return Promise.resolve(rateLimiter)
	}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		let points: number =
			this.specificOptions?.points || this.options.points || 0
		let pointsConsumed: number =
			this.specificOptions?.pointsConsumed ||
			this.options.pointsConsumed ||
			0

		const reflectedOptions: RateLimiterOptions =
			this.reflector.get<RateLimiterOptions>(
				'rateLimit',
				context.getHandler()
			)

		if (reflectedOptions) {
			if (reflectedOptions.points) {
				points = reflectedOptions.points
			}

			if (reflectedOptions.pointsConsumed) {
				pointsConsumed = reflectedOptions.pointsConsumed
			}
		}

		const request = this.httpHandler(context).req
		const response = this.httpHandler(context).res

		const rateLimiter: RateLimiterAbstract =
			await this.getRateLimiter(reflectedOptions)
		const key = this.getIpFromRequest(request)

		await this.responseHandler(
			response,
			key,
			rateLimiter,
			points,
			pointsConsumed
		)
		return true
	}

	protected getIpFromRequest(request: unknown): string | undefined {
		const req = request as { ip: string }
		return req.ip?.match(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/)?.[0]
	}

	private httpHandler(context: ExecutionContext) {
		if (this.options.for === 'ExpressGraphql') {
			return {
				req: context.getArgByIndex(2).req,
				res: context.getArgByIndex(2).req.res
			}
		}
		return {
			req: context.switchToHttp().getRequest(),
			res: context.switchToHttp().getResponse()
		}
	}

	private setResponseHeaders(
		response: any,
		points: number,
		rateLimiterResponse: RateLimiterRes
	) {
		response.header(
			'Retry-After',
			Math.ceil(rateLimiterResponse.msBeforeNext / 1000)
		)
		response.header('X-RateLimit-Limit', points)
		response.header(
			'X-Retry-Remaining',
			rateLimiterResponse.remainingPoints
		)
		response.header(
			'X-Retry-Reset',
			new Date(
				Date.now() + rateLimiterResponse.msBeforeNext
			).toUTCString()
		)
	}

	private async responseHandler(
		response: any,
		key: any,
		rateLimiter: RateLimiterAbstract,
		points: number,
		pointsConsumed: number
	) {
		try {
			if (
				this.specificOptions?.queueEnabled ||
				this.options.queueEnabled
			) {
				await this.queueLimiter?.removeTokens(1)
				return
			}

			const rateLimiterResponse: RateLimiterRes =
				await rateLimiter.consume(key as string, pointsConsumed)

			if (
				!this.specificOptions?.omitResponseHeaders &&
				!this.options.omitResponseHeaders
			) {
				this.setResponseHeaders(response, points, rateLimiterResponse)
			}
		} catch (error: unknown) {
			const rateLimiterResponse: RateLimiterRes = error as RateLimiterRes

			response.header(
				'Retry-After',
				Math.ceil(rateLimiterResponse.msBeforeNext / 1000)
			)

			if (
				typeof this.specificOptions?.customResponseSchema ===
					'function' ||
				typeof this.options.customResponseSchema === 'function'
			) {
				const errorBody =
					this.specificOptions?.customResponseSchema ||
					this.options.customResponseSchema
				throw new HttpException(
					errorBody
						? errorBody(rateLimiterResponse)
						: rateLimiterResponse,
					HttpStatus.TOO_MANY_REQUESTS
				)
			}

			throw new HttpException(
				this.specificOptions?.errorMessage ||
					this.options.errorMessage ||
					'Too many requests',
				HttpStatus.TOO_MANY_REQUESTS
			)
		}
	}
}
