import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'

import { RateLimit } from '@/src/modules/libs/rate-limiter/decorator/rate-limiter.decorator'
import { Authorization } from '@/src/shared/decorators/auth.decorator'
import { UserAgent } from '@/src/shared/decorators/user-agent.decorator'
import type { GqlContext } from '@/src/shared/types/gql-context.types'

import { AuthModel } from '../account/models/auth.model'

import { LoginInput } from './inputs/login.input'
import { SessionModel } from './models/session.model'
import { SessionService } from './session.service'

@Resolver('Session')
export class SessionResolver {
	constructor(private readonly sessionService: SessionService) {}

	@Authorization()
	@Query(() => [SessionModel], { name: 'findSessionsByUser' })
	async findByUser(@Context() { req }: GqlContext) {
		return this.sessionService.findByUser(req)
	}

	@Authorization()
	@Query(() => SessionModel, { name: 'findCurrentSession' })
	async findCurrent(@Context() { req }: GqlContext) {
		return this.sessionService.findCurrent(req)
	}

	@Mutation(() => AuthModel, { name: 'loginUser' })
	@RateLimit({
		keyPrefix: 'loginUser',
		points: 10,
		duration: 60,
		errorMessage:
			'Too many login attempts, please try again after one minute.'
	})
	async login(
		@Context() { req }: GqlContext,
		@Args('data') input: LoginInput,
		@UserAgent() userAgent: string
	) {
		return this.sessionService.login(req, input, userAgent)
	}

	@Authorization()
	@Mutation(() => Boolean, { name: 'logoutUser' })
	@RateLimit({
		keyPrefix: 'logoutUser',
		points: 10,
		duration: 60,
		errorMessage:
			'Too many logout attempts, please try again after one minute.'
	})
	async logout(@Context() { req }: GqlContext) {
		return this.sessionService.logout(req)
	}

	@Mutation(() => Boolean, { name: 'clearSessionCookie' })
	@RateLimit({
		keyPrefix: 'clearSessionCookie',
		points: 10,
		duration: 60,
		errorMessage:
			'Too many requests to clear session cookie, please try again after one minute.'
	})
	clearSession(@Context() { req }: GqlContext) {
		return this.sessionService.clearSession(req)
	}

	@Authorization()
	@Mutation(() => Boolean, { name: 'removeSession' })
	@RateLimit({
		keyPrefix: 'removeSession',
		points: 10,
		duration: 60,
		errorMessage:
			'Too many requests to remove session, please try again after one minute.'
	})
	async remove(@Context() { req }: GqlContext, @Args('id') id: string) {
		return this.sessionService.remove(req, id)
	}
}
