import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Throttle } from '@nestjs/throttler'

import type { User } from '@/src/generated/prisma/client'
import { Authorization } from '@/src/shared/decorators/auth.decorator'
import { Authorized } from '@/src/shared/decorators/authorized.decorator'

import { MakePaymentModel } from './models/make-payment.model'
import { TransactionModel } from './models/transaction.model'
import { TransactionService } from './transaction.service'

@Resolver('Transaction')
export class TransactionResolver {
	constructor(private readonly transactionService: TransactionService) {}

	@Authorization()
	@Query(() => [TransactionModel], { name: 'findMyTransactions' })
	async findMyTransactions(@Authorized() user: User) {
		return this.transactionService.findMyTransactions(user)
	}

	@Authorization()
	@Throttle({
		default: {
			limit: 10,
			ttl: 60000
		}
	})
	@Mutation(() => MakePaymentModel, { name: 'makePayment' })
	async makePayment(
		@Authorized() user: User,
		@Args('planId') planId: string
	) {
		return this.transactionService.makePayment(user, planId)
	}
}
