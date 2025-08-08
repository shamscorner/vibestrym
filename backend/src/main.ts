import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { RedisStore } from 'connect-redis'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.mjs'
import helmet from 'helmet'
import { Logger as PinoLogger } from 'nestjs-pino'

import { AppConfig } from './core/config/app.config'
import { CoreModule } from './core/core.module'
import { RedisService } from './core/redis/redis.service'
import { ms, StringValue } from './shared/utils/ms.util'
import { getSessionOptions } from './shared/utils/session.util'

function bootstrap(app: NestExpressApplication) {
	app.enableShutdownHooks()

	const config = app.get(ConfigService)
	const redis = app.get(RedisService)

	app.useLogger(app.get(PinoLogger))

	app.use(cookieParser(config.get<string>('COOKIES_SECRET')))
	app.use(config.getOrThrow<string>('GRAPHQL_PREFIX'), graphqlUploadExpress())

	app.useGlobalPipes(
		new ValidationPipe({
			transform: true
		})
	)

	app.use(
		session({
			secret: config.getOrThrow<string>('SESSION_SECRET'),
			name: config.getOrThrow<string>('SESSION_NAME'),
			resave: false,
			saveUninitialized: false,
			cookie: {
				...getSessionOptions(config),
				maxAge: ms(config.getOrThrow<StringValue>('SESSION_MAX_AGE'))
			},
			store: new RedisStore({
				client: redis,
				prefix: config.getOrThrow<string>('SESSION_FOLDER')
			})
		})
	)

	app.enableCors({
		origin: config.getOrThrow<string>('ALLOWED_ORIGIN'),
		credentials: true,
		exposedHeaders: ['set-cookie']
	})

	app.use(
		helmet({
			crossOriginEmbedderPolicy: false,
			contentSecurityPolicy: {
				directives: {
					imgSrc: [
						`'self'`,
						'data:',
						'apollo-server-landing-page.cdn.apollographql.com'
					],
					scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
					manifestSrc: [
						`'self'`,
						'apollo-server-landing-page.cdn.apollographql.com'
					],
					frameSrc: [`'self'`, 'sandbox.embed.apollographql.com']
				}
			}
		})
	)
}

async function run() {
	const app = await NestFactory.create<NestExpressApplication>(CoreModule, {
		rawBody: true,
		bufferLogs: true
	})

	const logger = app.get(PinoLogger)

	try {
		bootstrap(app)

		const port = app
			.get(ConfigService<AppConfig, true>)
			.get('application.port', { infer: true })

		await app.listen(port)

		app.get(PinoLogger).log(
			`🚀 Application is running on: http://localhost:${port}`
		)
	} catch (error: unknown) {
		console.error('Error starting application:', error)
		logger.error('Application crashed', {
			error
		})
	}
}

run().catch((error: Error) => {
	console.error('Failed to start Vibestrym Platform API', {
		error: error.stack
	})
	process.exit(1)
})
