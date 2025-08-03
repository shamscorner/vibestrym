import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { RedisStore } from 'connect-redis'
import * as cookieParser from 'cookie-parser'
import * as session from 'express-session'
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.mjs'
import { Logger } from 'nestjs-pino'

import { CoreModule } from './core/core.module'
import { RedisService } from './core/redis/redis.service'
import { ms, StringValue } from './shared/utils/ms.util'
import { getSessionOptions } from './shared/utils/session.util'

async function bootstrap() {
	const app = await NestFactory.create(CoreModule, {
		rawBody: true,
		bufferLogs: true
	})

	const config = app.get(ConfigService)
	const redis = app.get(RedisService)

	app.useLogger(app.get(Logger))

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

	const port = config.getOrThrow<number>('APPLICATION_PORT')

	await app.listen(port)

	app.get(Logger).log(
		`🚀 Application is running on: http://localhost:${port}`
	)
}
void bootstrap()
