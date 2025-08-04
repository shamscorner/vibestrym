import { BadRequestException } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import type { IngressInput } from 'livekit-server-sdk'

import type { User } from '@/prisma/generated'
import { RateLimit } from '@/src/modules/libs/rate-limiter/decorator/rate-limiter.decorator'
import { Authorization } from '@/src/shared/decorators/auth.decorator'
import { Authorized } from '@/src/shared/decorators/authorized.decorator'

import { IngressService } from './ingress.service'

@Resolver('Ingress')
export class IngressResolver {
	constructor(private readonly ingressService: IngressService) {}

	@Authorization()
	@Mutation(() => Boolean, { name: 'createIngress' })
	@RateLimit({
		keyPrefix: 'createIngress',
		points: 8,
		duration: 60,
		errorMessage:
			'Too many requests to create ingress, please try again after one minute.'
	})
	async create(
		@Authorized() user: User,
		@Args('ingressType') ingressType: IngressInput
	) {
		return this.ingressService.create(user, ingressType)
	}

	@Authorization()
	@Mutation(() => Boolean, { name: 'resetIngresses' })
	@RateLimit({
		keyPrefix: 'resetIngresses',
		points: 8,
		duration: 60,
		errorMessage:
			'Too many requests to reset ingresses, please try again after one minute.'
	})
	async reset(@Authorized() user: User) {
		return this.ingressService.reset(user)
	}

	// public method to reset ingresses by room name in development only
	@Mutation(() => Boolean, { name: 'resetIngressesByRoomname' })
	@RateLimit({
		keyPrefix: 'resetIngressesByRoomname',
		points: 5,
		duration: 60,
		errorMessage:
			'Too many requests to reset ingresses by room name, please try again after one minute.'
	})
	async resetByRoomname(@Args('roomName') roomName: string) {
		if (process.env.NODE_ENV !== 'development') {
			throw new BadRequestException(
				'This action is not allowed in production environment.'
			)
		}
		return this.ingressService.resetByRoomname(roomName)
	}
}
