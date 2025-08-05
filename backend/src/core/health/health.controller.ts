import { Controller, Get } from '@nestjs/common'
import {
	DiskHealthIndicator,
	HealthCheck,
	HealthCheckService,
	HttpHealthIndicator,
	MemoryHealthIndicator,
	PrismaHealthIndicator
} from '@nestjs/terminus'
import { SkipThrottle } from '@nestjs/throttler'

import { PrismaService } from '../prisma/prisma.service'

import { GraphQLHealthIndicator } from './graphql-health.indicator'

@SkipThrottle()
@Controller('health')
export class HealthController {
	constructor(
		private healthService: HealthCheckService,
		private graphqlHealth: GraphQLHealthIndicator,
		private httpHealth: HttpHealthIndicator,
		private prismaHealth: PrismaHealthIndicator,
		private prismaService: PrismaService,
		private diskHealth: DiskHealthIndicator,
		private memoryHealth: MemoryHealthIndicator
	) {}

	@Get()
	@HealthCheck()
	check() {
		return this.healthService.check([
			() => this.graphqlHealth.isHealthy('graphql')
		])
	}

	@Get('http')
	@HealthCheck()
	checkHttp() {
		return this.healthService.check([
			() =>
				this.httpHealth.pingCheck(
					'nestjs-docs',
					'https://docs.nestjs.com'
				)
		])
	}

	@Get('prisma')
	@HealthCheck()
	checkPrisma() {
		return this.healthService.check([
			() => this.prismaHealth.pingCheck('prisma', this.prismaService)
		])
	}

	@Get('memory')
	@HealthCheck()
	healthCheck() {
		return this.healthService.check([
			async () =>
				this.memoryHealth.checkHeap('memory_heap', 200 * 1024 * 1024), // 200 MB
			async () =>
				this.memoryHealth.checkRSS('memory_rss', 3000 * 1024 * 1024) // 3 GB
		])
	}

	@Get('disk')
	@HealthCheck()
	checkDisk() {
		return this.healthService.check([
			// The used disk storage should not exceed 80% of the full disk size
			() =>
				this.diskHealth.checkStorage('disk-percentage', {
					thresholdPercent: 0.8,
					path: '/'
				}),
			// The used disk storage should not exceed 500 GB
			() =>
				this.diskHealth.checkStorage('disk-absolute', {
					threshold: 500 * 1024 * 1024 * 1024,
					path: '/'
				})
		])
	}
}
