import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { User } from '@/prisma/generated'
import { RateLimit } from '@/src/modules/libs/rate-limiter/decorator/rate-limiter.decorator'
import { Authorization } from '@/src/shared/decorators/auth.decorator'
import { Authorized } from '@/src/shared/decorators/authorized.decorator'

import { FollowService } from './follow.service'
import { FollowModel } from './models/follow.model'

@Resolver('Follow')
export class FollowResolver {
	constructor(private readonly followService: FollowService) {}

	@Authorization()
	@Query(() => [FollowModel], { name: 'findMyFollowers' })
	async findMyFollowers(@Authorized() user: User) {
		return this.followService.findMyFollowers(user)
	}

	@Authorization()
	@Query(() => [FollowModel], { name: 'findMyFollowings' })
	async findMyFollowings(@Authorized() user: User) {
		return this.followService.findMyFollowings(user)
	}

	@Authorization()
	@RateLimit({
		keyPrefix: 'followChannel',
		points: 40,
		duration: 60,
		errorMessage:
			'Too many requests to follow channels, please try after one minute later.'
	})
	@Mutation(() => Boolean, { name: 'followChannel' })
	async follow(
		@Authorized() user: User,
		@Args('channelId') channelId: string
	) {
		return this.followService.follow(user, channelId)
	}

	@Authorization()
	@RateLimit({
		keyPrefix: 'unfollowChannel',
		points: 40,
		duration: 60,
		errorMessage:
			'Too many requests to unfollow channels, please try after one minute later.'
	})
	@Mutation(() => Boolean, { name: 'unfollowChannel' })
	async unfollow(
		@Authorized() user: User,
		@Args('channelId') channelId: string
	) {
		return this.followService.unfollow(user, channelId)
	}
}
