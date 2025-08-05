import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Throttle } from '@nestjs/throttler'

import type { User } from '@/prisma/generated'
import { Authorization } from '@/src/shared/decorators/auth.decorator'
import { Authorized } from '@/src/shared/decorators/authorized.decorator'

import { CreatePlanInput } from './inputs/create-plan.input'
import { PlanModel } from './models/plan.model'
import { PlanService } from './plan.service'

@Resolver('Plan')
export class PlanResolver {
	constructor(private readonly planService: PlanService) {}

	@Authorization()
	@Query(() => [PlanModel], { name: 'findMySponsorshipPlans' })
	async findMyPlans(@Authorized() user: User) {
		return this.planService.findMyPlans(user)
	}

	@Authorization()
	@Throttle({
		default: {
			limit: 5,
			ttl: 60000
		}
	})
	@Mutation(() => Boolean, { name: 'createSponsorshipPlan' })
	async create(
		@Authorized() user: User,
		@Args('data') input: CreatePlanInput
	) {
		return this.planService.create(user, input)
	}

	@Authorization()
	@Throttle({
		default: {
			limit: 5,
			ttl: 60000
		}
	})
	@Mutation(() => Boolean, { name: 'removeSponsorshipPlan' })
	async remove(@Args('planId') planId: string) {
		return this.planService.remove(planId)
	}
}
