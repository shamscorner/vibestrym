import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import type { User } from '@/prisma/generated'
import { RateLimit } from '@/src/modules/libs/rate-limiter/decorator/rate-limiter.decorator'
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
	@RateLimit({
		keyPrefix: 'makePayment',
		points: 10,
		duration: 60,
		errorMessage:
			'Too many requests to make a payment, please try again after one minute.'
	})
	@Mutation(() => MakePaymentModel, { name: 'makePayment' })
	async makePayment(
		@Authorized() user: User,
		@Args('planId') planId: string
	) {
		return this.transactionService.makePayment(user, planId)
	}
}
