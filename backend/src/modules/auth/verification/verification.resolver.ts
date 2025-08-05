import { Args, Context, Mutation, Resolver } from '@nestjs/graphql'
import { Throttle } from '@nestjs/throttler'

import { UserAgent } from '@/src/shared/decorators/user-agent.decorator'
import type { GqlContext } from '@/src/shared/types/gql-context.types'

import { AuthModel } from '../account/models/auth.model'

import { VerificationInput } from './inputs/verification.input'
import { VerificationService } from './verification.service'

@Resolver('Verification')
export class VerificationResolver {
	constructor(private readonly verificationService: VerificationService) {}

	@Throttle({
		default: {
			limit: 3,
			ttl: 60000
		}
	})
	@Mutation(() => AuthModel, { name: 'verifyAccount' })
	async verify(
		@Context() { req }: GqlContext,
		@Args('data') input: VerificationInput,
		@UserAgent() userAgent: string
	) {
		return this.verificationService.verify(req, input, userAgent)
	}
}
