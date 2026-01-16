import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Throttle } from '@nestjs/throttler'

import { User } from '@/src/generated/prisma/client'
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
	@Throttle({
		default: {
			limit: 40,
			ttl: 60000
		}
	})
	@Mutation(() => Boolean, { name: 'followChannel' })
	async follow(
		@Authorized() user: User,
		@Args('channelId') channelId: string
	) {
		return this.followService.follow(user, channelId)
	}

	@Authorization()
	@Throttle({
		default: {
			limit: 40,
			ttl: 60000
		}
	})
	@Mutation(() => Boolean, { name: 'unfollowChannel' })
	async unfollow(
		@Authorized() user: User,
		@Args('channelId') channelId: string
	) {
		return this.followService.unfollow(user, channelId)
	}
}
