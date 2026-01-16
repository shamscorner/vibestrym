import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Throttle } from '@nestjs/throttler'
import GraphQLUpload from 'graphql-upload/GraphQLUpload.mjs'
import GqlUpload from 'graphql-upload/Upload.mjs'

import { User } from '@/src/generated/prisma/client'
import { Authorization } from '@/src/shared/decorators/auth.decorator'
import { Authorized } from '@/src/shared/decorators/authorized.decorator'
import { FileValidationPipe } from '@/src/shared/pipes/file-validation.pipe'

import { ChangeStreamInfoInput } from './inputs/change-stream-info.input'
import { FiltersInput } from './inputs/filters.input'
import { GenerateStreamTokenInput } from './inputs/generate-stream-token.input'
import { GenerateStreamTokenModel } from './models/generate-stream-token.model'
import { StreamModel } from './models/stream.model'
import { StreamService } from './stream.service'

@Resolver('Stream')
export class StreamResolver {
	constructor(private readonly streamService: StreamService) {}

	@Query(() => [StreamModel], { name: 'findAllStreams' })
	public async findAll(
		@Args('filters', { nullable: true }) input?: FiltersInput
	) {
		return this.streamService.findAll(input)
	}

	@Query(() => [StreamModel], { name: 'findRandomStreams' })
	public async findRandom() {
		return this.streamService.findRandom()
	}

	@Authorization()
	@Throttle({
		default: {
			limit: 5,
			ttl: 60000
		}
	})
	@Mutation(() => Boolean, { name: 'changeStreamInfo' })
	async changeInfo(
		@Authorized() user: User,
		@Args('data') input: ChangeStreamInfoInput
	) {
		return this.streamService.changeInfo(user, input)
	}

	@Authorization()
	@Throttle({
		default: {
			limit: 5,
			ttl: 60000
		}
	})
	@Mutation(() => Boolean, { name: 'changeStreamThumbnail' })
	async changeThumbnail(
		@Authorized() user: User,
		@Args('thumbnail', { type: () => GraphQLUpload }, FileValidationPipe)
		thumbnail: GqlUpload['file']
	) {
		return this.streamService.changeThumbnail(user, thumbnail)
	}

	@Authorization()
	@Throttle({
		default: {
			limit: 5,
			ttl: 60000
		}
	})
	@Mutation(() => Boolean, { name: 'removeStreamThumbnail' })
	public async removeThumbnail(@Authorized() user: User) {
		return this.streamService.removeThumbnail(user)
	}

	@Mutation(() => GenerateStreamTokenModel, { name: 'generateStreamToken' })
	public async generateToken(@Args('data') input: GenerateStreamTokenInput) {
		return this.streamService.generateToken(input)
	}
}
