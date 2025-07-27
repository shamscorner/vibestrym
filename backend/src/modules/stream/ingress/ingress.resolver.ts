import { Args, Mutation, Resolver } from '@nestjs/graphql'
import type { IngressInput } from 'livekit-server-sdk'

import type { User } from '@/prisma/generated'
import { Authorization } from '@/src/shared/decorators/auth.decorator'
import { Authorized } from '@/src/shared/decorators/authorized.decorator'

import { IngressService } from './ingress.service'

@Resolver('Ingress')
export class IngressResolver {
	constructor(private readonly ingressService: IngressService) {}

	@Authorization()
	@Mutation(() => Boolean, { name: 'createIngress' })
	async create(
		@Authorized() user: User,
		@Args('ingressType') ingressType: IngressInput
	) {
		return this.ingressService.create(user, ingressType)
	}

	@Authorization()
	@Mutation(() => Boolean, { name: 'resetIngresses' })
	async reset(@Authorized() user: User) {
		return this.ingressService.reset(user)
	}
}
