import { ApolloDriver } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { GraphQLModule } from '@nestjs/graphql'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'

import { AuthModule } from '../modules/auth/auth.module'
import { CronModule } from '../modules/cron/cron.module'
import { FollowModule } from '../modules/follow/follow.module'
import { DiscordModule } from '../modules/libs/discord/discord.module'
import { LivekitModule } from '../modules/libs/livekit/livekit.module'
import { LoggerModule } from '../modules/libs/logger/logger.module'
import { MailModule } from '../modules/libs/mail/mail.module'
import { RateLimiterGuard } from '../modules/libs/rate-limiter/guards/rate-limiter.guard'
// import { RateLimiterModule } from '../modules/libs/rate-limiter/rate-limiter.module'
import { StorageModule } from '../modules/libs/storage/storage.module'
import { StripeModule } from '../modules/libs/stripe/stripe.module'
import { TelegramModule } from '../modules/libs/telegram/telegram.module'
import { NotificationModule } from '../modules/notification/notification.module'
import { StreamModule } from '../modules/stream/stream.module'
import { WebhookModule } from '../modules/webhook/webhook.module'
import { IS_DEV_ENV } from '../shared/utils/is-dev.util'

import { getGraphQLConfig } from './config/graphql.config'
import { getLiveKitConfig } from './config/livekit.config'
import { getStripeConfig } from './config/stripe.config'
import { PrismaModule } from './prisma/prisma.module'
import { RedisModule } from './redis/redis.module'
import { RedisService } from './redis/redis.service'

@Module({
	imports: [
		LoggerModule,
		ConfigModule.forRoot({
			ignoreEnvFile: !IS_DEV_ENV,
			isGlobal: true
		}),
		GraphQLModule.forRootAsync({
			driver: ApolloDriver,
			imports: [ConfigModule],
			useFactory: getGraphQLConfig,
			inject: [ConfigService]
		}),
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', '..', 'client'),
			exclude: ['/api/{*test}'],
			serveStaticOptions: {
				fallthrough: false
			}
		}),
		// RateLimiterModule.registerAsync({
		// 	useFactory: () => ({
		// 		for: 'ExpressGraphql',
		// 		type: 'Redis',
		// 		storeClient: RedisService.getClient()
		// 	})
		// }),
		LivekitModule.registerAsync({
			imports: [ConfigModule],
			useFactory: getLiveKitConfig,
			inject: [ConfigService]
		}),
		StripeModule.registerAsync({
			imports: [ConfigModule],
			useFactory: getStripeConfig,
			inject: [ConfigService]
		}),
		PrismaModule,
		RedisModule,
		MailModule,
		StorageModule,
		CronModule,
		AuthModule,
		StreamModule,
		WebhookModule,
		StripeModule,
		FollowModule,
		NotificationModule,
		TelegramModule,
		DiscordModule
	]
	// providers: [
	// 	{
	// 		provide: APP_GUARD,
	// 		useClass: RateLimiterGuard
	// 	}
	// ]
})
export class CoreModule {}
