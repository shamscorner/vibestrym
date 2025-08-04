import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { User } from '@/prisma/generated'
import { Authorization } from '@/src/shared/decorators/auth.decorator'
import { Authorized } from '@/src/shared/decorators/authorized.decorator'

import { RateLimit } from '../../libs/rate-limiter/decorator/rate-limiter.decorator'

import { DisableTotpInput } from './inputs/disable-totp.input'
import { EnableTotpInput } from './inputs/enable-totp.input'
import { TotpModel } from './models/totp.model'
import { TotpService } from './totp.service'

@Resolver('Totp')
export class TotpResolver {
	constructor(private readonly totpService: TotpService) {}

	@Authorization()
	@RateLimit({
		keyPrefix: 'generateTotpSecret',
		points: 2,
		duration: 60,
		errorMessage:
			'Too many requests to generate TOTP secret, please try after one minute later.'
	})
	@Query(() => TotpModel, { name: 'generateTotpSecret' })
	async generate(@Authorized() user: User) {
		return this.totpService.generate(user)
	}

	@Authorization()
	@RateLimit({
		keyPrefix: 'enableTotp',
		points: 5,
		duration: 60,
		errorMessage:
			'Too many requests to enable TOTP, please try after one minute later.'
	})
	@Mutation(() => Boolean, { name: 'enableTotp' })
	async enable(
		@Authorized() user: User,
		@Args('data') input: EnableTotpInput
	) {
		return this.totpService.enable(user, input)
	}

	@Authorization()
	@RateLimit({
		keyPrefix: 'disableTotp',
		points: 5,
		duration: 60,
		errorMessage:
			'Too many requests to disable TOTP, please try after one minute later.'
	})
	@Mutation(() => Boolean, { name: 'disableTotp' })
	async disable(
		@Authorized() user: User,
		@Args('data') input: DisableTotpInput
	) {
		return this.totpService.disable(user, input)
	}
}
