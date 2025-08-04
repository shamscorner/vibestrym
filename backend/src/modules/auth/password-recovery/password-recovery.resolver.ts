import { Args, Context, Mutation, Resolver } from '@nestjs/graphql'

import { RateLimit } from '@/src/modules/libs/rate-limiter/decorator/rate-limiter.decorator'
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

	@RateLimit({
		keyPrefix: 'resetPassword',
		points: 5,
		duration: 60,
		errorMessage:
			'Too many requests to reset password, please try again after one minute.'
	})
	@Mutation(() => Boolean, { name: 'resetPassword' })
	async resetPassword(
		@Context() { req }: GqlContext,
		@Args('data') input: ResetPasswordInput,
		@UserAgent() userAgent: string
	) {
		return this.passwordRecoveryService.resetPassword(req, input, userAgent)
	}

	@RateLimit({
		keyPrefix: 'newPassword',
		points: 5,
		duration: 60,
		errorMessage:
			'Too many requests to set a new password, please try again after one minute.'
	})
	@Mutation(() => Boolean, { name: 'newPassword' })
	public async newPassword(@Args('data') input: NewPasswordInput) {
		return this.passwordRecoveryService.newPassword(input)
	}
}
