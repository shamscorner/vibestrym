import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaPg } from '@prisma/adapter-pg'

import { PrismaClient } from '@/src/generated/prisma/client'

import { AppConfig } from '../config/app.config'

@Injectable()
export class PrismaService extends PrismaClient {
	constructor(configService: ConfigService) {
		const databaseUrl =
			configService.get<AppConfig['database']['url']>('DATABASE_URL')

		if (!databaseUrl || typeof databaseUrl !== 'string') {
			throw new Error('DATABASE_URL is not configured.')
		}

		const adapter = new PrismaPg({
			connectionString: databaseUrl
		})

		super({ adapter })
	}
}
