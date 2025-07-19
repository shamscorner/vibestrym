import { Module } from '@nestjs/common'

import { PlanModule } from './plan/plan.module'
import { SubscriptionModule } from './subscription/subscription.module'
import { TransactionModule } from './transaction/transaction.module'

@Module({
	imports: [PlanModule, TransactionModule, SubscriptionModule]
})
export class SponsorshipModule {}
