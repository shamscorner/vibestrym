import {
	ForbiddenException,
	Injectable,
	InternalServerErrorException,
	NotFoundException
} from '@nestjs/common'

import { PrismaService } from '@/src/core/prisma/prisma.service'
import type { User } from '@/src/generated/prisma/client'
import { StripeService } from '@/src/modules/libs/stripe/stripe.service'

import { CreatePlanInput } from './inputs/create-plan.input'

@Injectable()
export class PlanService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly stripeService: StripeService
	) {}

	async findMyPlans(user: User) {
		const plans = await this.prismaService.sponsorshipPlan.findMany({
			where: {
				channelId: user.id
			},
			include: {
				channel: true
			}
		})
		return plans
	}

	async create(user: User, input: CreatePlanInput) {
		const { title, description, price } = input

		const channel = await this.prismaService.user.findUnique({
			where: {
				id: user.id
			}
		})

		if (!channel?.isVerified) {
			throw new ForbiddenException(
				'Creating plans is only available for verified channels'
			)
		}

		const stripePlan = await this.stripeService.plans.create({
			amount: Math.round(price * 100),
			currency: 'usd',
			interval: 'month',
			product: {
				name: title
			}
		})

		if (!stripePlan.product || !stripePlan.id) {
			throw new InternalServerErrorException(
				'Failed to create Stripe plan'
			)
		}

		await this.prismaService.sponsorshipPlan.create({
			data: {
				title,
				description,
				price,
				stripeProductId:
					typeof stripePlan.product === 'string'
						? stripePlan.product
						: stripePlan.product.id,
				stripePlanId: stripePlan.id,
				channel: {
					connect: {
						id: user.id
					}
				}
			}
		})

		return true
	}

	async remove(planId: string) {
		const plan = await this.prismaService.sponsorshipPlan.findUnique({
			where: {
				id: planId
			}
		})

		if (!plan) {
			throw new NotFoundException('Plan not found')
		}

		await this.stripeService.plans.del(plan.stripePlanId)
		await this.stripeService.products.del(plan.stripeProductId)

		await this.prismaService.sponsorshipPlan.delete({
			where: {
				id: plan.id
			}
		})

		return true
	}
}
