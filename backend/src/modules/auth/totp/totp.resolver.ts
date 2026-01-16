import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Throttle } from '@nestjs/throttler'

import { User } from '@/src/generated/prisma/client'
import { Authorization } from '@/src/shared/decorators/auth.decorator'
import { Authorized } from '@/src/shared/decorators/authorized.decorator'

import { DisableTotpInput } from './inputs/disable-totp.input'
import { EnableTotpInput } from './inputs/enable-totp.input'
import { TotpModel } from './models/totp.model'
import { TotpService } from './totp.service'

@Resolver('Totp')
export class TotpResolver {
	constructor(private readonly totpService: TotpService) {}

	@Authorization()
	@Throttle({
		default: {
			limit: 2,
			ttl: 60000
		}
	})
	@Query(() => TotpModel, { name: 'generateTotpSecret' })
	async generate(@Authorized() user: User) {
		return this.totpService.generate(user)
	}

	@Authorization()
	@Throttle({
		default: {
			limit: 5,
			ttl: 60000
		}
	})
	@Mutation(() => Boolean, { name: 'enableTotp' })
	async enable(
		@Authorized() user: User,
		@Args('data') input: EnableTotpInput
	) {
		return this.totpService.enable(user, input)
	}

	@Authorization()
	@Throttle({
		default: {
			limit: 5,
			ttl: 60000
		}
	})
	@Mutation(() => Boolean, { name: 'disableTotp' })
	async disable(
		@Authorized() user: User,
		@Args('data') input: DisableTotpInput
	) {
		return this.totpService.disable(user, input)
	}
}
