import { BadRequestException } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { Throttle } from '@nestjs/throttler'

import type { User } from '@/src/generated/prisma/client'
import { Authorization } from '@/src/shared/decorators/auth.decorator'
import { Authorized } from '@/src/shared/decorators/authorized.decorator'

import { IngressService } from './ingress.service'
import { IngressInputType } from './inputs/ingress.input'

@Resolver('Ingress')
export class IngressResolver {
	constructor(private readonly ingressService: IngressService) {}

	@Authorization()
	@Throttle({
		default: {
			limit: 8,
			ttl: 60000
		}
	})
	@Mutation(() => Boolean, { name: 'createIngress' })
	async create(
		@Authorized() user: User,
		@Args('ingressType') ingressType: IngressInputType
	) {
		return this.ingressService.create(user, ingressType.type)
	}

	@Authorization()
	@Throttle({
		default: {
			limit: 8,
			ttl: 60000
		}
	})
	@Mutation(() => Boolean, { name: 'resetIngresses' })
	async reset(@Authorized() user: User) {
		return this.ingressService.reset(user)
	}

	// public method to reset ingresses by room name in development only
	@Mutation(() => Boolean, { name: 'resetIngressesByRoomname' })
	@Throttle({
		default: {
			limit: 5,
			ttl: 60000
		}
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
