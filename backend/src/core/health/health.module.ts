import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { TerminusModule } from '@nestjs/terminus'

import { GraphQLHealthIndicator } from './graphql-health.indicator'
import { HealthController } from './health.controller'

@Module({
	imports: [TerminusModule, HttpModule],
	controllers: [HealthController],
	providers: [GraphQLHealthIndicator]
})
export class HealthModule {}
