import { Args, Context, Mutation, Resolver } from '@nestjs/graphql'
import { Throttle } from '@nestjs/throttler'

import { UserAgent } from '@/src/shared/decorators/user-agent.decorator'
import { GqlContext } from '@/src/shared/types/gql-context.types'

import { NewPasswordInput } from './inputs/new-password.input'
import { ResetPasswordInput } from './inputs/reset-password.input'
import { PasswordRecoveryService } from './password-recovery.service'

@Resolver('PasswordRecovery')
export class PasswordRecoveryResolver {
	constructor(
		private readonly passwordRecoveryService: PasswordRecoveryService
	) {}

	@Throttle({
		default: {
			limit: 5,
			ttl: 60000
		}
	})
	@Mutation(() => Boolean, { name: 'resetPassword' })
	async resetPassword(
		@Context() { req }: GqlContext,
		@Args('data') input: ResetPasswordInput,
		@UserAgent() userAgent: string
	) {
		return this.passwordRecoveryService.resetPassword(req, input, userAgent)
	}

	@Throttle({
		default: {
			limit: 5,
			ttl: 60000
		}
	})
	@Mutation(() => Boolean, { name: 'newPassword' })
	public async newPassword(@Args('data') input: NewPasswordInput) {
		return this.passwordRecoveryService.newPassword(input)
	}
}
