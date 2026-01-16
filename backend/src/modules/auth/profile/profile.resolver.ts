import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Throttle } from '@nestjs/throttler'
import GraphQLUpload from 'graphql-upload/GraphQLUpload.mjs'
import GqlUpload from 'graphql-upload/Upload.mjs'

import { User } from '@/src/generated/prisma/client'
import { Authorization } from '@/src/shared/decorators/auth.decorator'
import { Authorized } from '@/src/shared/decorators/authorized.decorator'
import { FileValidationPipe } from '@/src/shared/pipes/file-validation.pipe'

import { ChangeProfileInfoInput } from './inputs/change-profile-info.input'
import {
	SocialLinkInput,
	SocialLinkOrderInput
} from './inputs/social-link.input'
import { SocialLinkModel } from './models/social-link.model'
import { ProfileService } from './profile.service'

@Resolver('Profile')
export class ProfileResolver {
	constructor(private readonly profileService: ProfileService) {}

	@Authorization()
	@Throttle({
		default: {
			limit: 10,
			ttl: 60000
		}
	})
	@Mutation(() => Boolean, { name: 'changeProfileAvatar' })
	async changeAvatar(
		@Authorized() user: User,
		@Args('avatar', { type: () => GraphQLUpload }, FileValidationPipe)
		avatar: GqlUpload['file']
	) {
		return this.profileService.changeAvatar(user, avatar)
	}

	@Authorization()
	@Throttle({
		default: {
			limit: 10,
			ttl: 60000
		}
	})
	@Mutation(() => Boolean, { name: 'removeProfileAvatar' })
	async removeAvatar(@Authorized() user: User) {
		return this.profileService.removeAvatar(user)
	}

	@Authorization()
	@Throttle({
		default: {
			limit: 20,
			ttl: 60000
		}
	})
	@Mutation(() => Boolean, { name: 'changeProfileInfo' })
	async changeInfo(
		@Authorized() user: User,
		@Args('data') input: ChangeProfileInfoInput
	) {
		return this.profileService.changeInfo(user, input)
	}

	@Authorization()
	@Query(() => [SocialLinkModel], { name: 'findSocialLinks' })
	async findSocialLinks(@Authorized() user: User) {
		return this.profileService.findSocialLinks(user)
	}

	@Authorization()
	@Throttle({
		default: {
			limit: 30,
			ttl: 60000
		}
	})
	@Mutation(() => Boolean, { name: 'createSocialLink' })
	async createSocialLink(
		@Authorized() user: User,
		@Args('data') input: SocialLinkInput
	) {
		return this.profileService.createSocialLink(user, input)
	}

	@Authorization()
	@Throttle({
		default: {
			limit: 30,
			ttl: 60000
		}
	})
	@Mutation(() => Boolean, { name: 'reorderSocialLinks' })
	async reorderSocialLinks(
		@Args('list', { type: () => [SocialLinkOrderInput] })
		list: SocialLinkOrderInput[]
	) {
		return this.profileService.reorderSocialLinks(list)
	}

	@Authorization()
	@Throttle({
		default: {
			limit: 30,
			ttl: 60000
		}
	})
	@Mutation(() => Boolean, { name: 'updateSocialLink' })
	async updateSocialLink(
		@Args('id') id: string,
		@Args('data') input: SocialLinkInput
	) {
		return this.profileService.updateSocialLink(id, input)
	}

	@Authorization()
	@Throttle({
		default: {
			limit: 40,
			ttl: 60000
		}
	})
	@Mutation(() => Boolean, { name: 'removeSocialLink' })
	async removeSocialLink(@Args('id') id: string) {
		return this.profileService.removeSocialLink(id)
	}
}
