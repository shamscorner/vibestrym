import { plainToInstance, Type } from 'class-transformer'
import {
	IsBoolean,
	IsEmail,
	IsEnum,
	IsNumber,
	IsString,
	IsUrl,
	Max,
	Min,
	validateSync
} from 'class-validator'

import { Environment } from './env'

class EnvironmentVariables implements Environment {
	@IsEnum(['development', 'production', 'test'])
	NODE_ENV: Environment['NODE_ENV']

	@IsString()
	LOG_LEVEL: Environment['LOG_LEVEL']

	@Type(() => Number)
	@IsNumber()
	@Min(0)
	@Max(65535)
	APPLICATION_PORT: Environment['APPLICATION_PORT']

	@IsString()
	APPLICATION_URL: Environment['APPLICATION_URL']

	@Type(() => Number)
	@IsNumber()
	THROTTLE_TTL: Environment['THROTTLE_TTL']

	@Type(() => Number)
	@IsNumber()
	THROTTLE_LIMIT: Environment['THROTTLE_LIMIT']

	@IsString()
	GRAPHQL_PREFIX: Environment['GRAPHQL_PREFIX']

	@IsString()
	GRAPHQL_VERSION: Environment['GRAPHQL_VERSION']

	@IsString()
	APOLLO_GRAPH_REF: Environment['APOLLO_GRAPH_REF']

	@IsString()
	ALLOWED_ORIGIN: Environment['ALLOWED_ORIGIN']

	@IsEmail()
	ADMIN_EMAIL: Environment['ADMIN_EMAIL']

	@IsString()
	COOKIES_SECRET: Environment['COOKIES_SECRET']

	@IsString()
	SESSION_SECRET: Environment['SESSION_SECRET']

	@IsString()
	SESSION_NAME: Environment['SESSION_NAME']

	@IsString()
	SESSION_DOMAIN: Environment['SESSION_DOMAIN']

	@IsString()
	SESSION_MAX_AGE: Environment['SESSION_MAX_AGE']

	@Type(() => Boolean)
	@IsBoolean()
	SESSION_HTTP_ONLY: Environment['SESSION_HTTP_ONLY']

	@Type(() => Boolean)
	@IsBoolean()
	SESSION_SECURE: Environment['SESSION_SECURE']

	@IsString()
	SESSION_FOLDER: Environment['SESSION_FOLDER']

	@IsString()
	POSTGRES_USER: Environment['POSTGRES_USER']

	@IsString()
	POSTGRES_PASSWORD: Environment['POSTGRES_PASSWORD']

	@IsString()
	POSTGRES_HOST: Environment['POSTGRES_HOST']

	@Type(() => Number)
	@IsNumber()
	POSTGRES_PORT: Environment['POSTGRES_PORT']

	@IsString()
	POSTGRES_DATABASE: Environment['POSTGRES_DATABASE']

	@IsString()
	POSTGRES_URI: Environment['POSTGRES_URI']

	@IsString()
	REDIS_USER: Environment['REDIS_USER']

	@IsString()
	REDIS_PASSWORD: Environment['REDIS_PASSWORD']

	@IsString()
	REDIS_HOST: Environment['REDIS_HOST']

	@Type(() => Number)
	@IsNumber()
	REDIS_PORT: Environment['REDIS_PORT']

	@IsString()
	REDIS_URI: Environment['REDIS_URI']

	@IsString()
	MAIL_HOST: Environment['MAIL_HOST']

	@Type(() => Number)
	@IsNumber()
	MAIL_PORT: Environment['MAIL_PORT']

	@IsString()
	MAIL_LOGIN: Environment['MAIL_LOGIN']

	@IsString()
	MAIL_PASSWORD: Environment['MAIL_PASSWORD']

	@IsEmail()
	MAIL_FROM: Environment['MAIL_FROM']

	@IsString()
	TOTP_ISSUER: Environment['TOTP_ISSUER']

	@IsString()
	S3_ENDPOINT: Environment['S3_ENDPOINT']

	@IsString()
	S3_REGION: Environment['S3_REGION']

	@IsString()
	S3_ACCESS_KEY_ID: Environment['S3_ACCESS_KEY_ID']

	@IsString()
	S3_SECRET_ACCESS_KEY: Environment['S3_SECRET_ACCESS_KEY']

	@IsString()
	S3_BUCKET_NAME: Environment['S3_BUCKET_NAME']

	@IsUrl({ protocols: ['https', 'http', 'ws', 'wss'] })
	LIVEKIT_API_URL: Environment['LIVEKIT_API_URL']

	@IsString()
	LIVEKIT_API_KEY: Environment['LIVEKIT_API_KEY']

	@IsString()
	LIVEKIT_API_SECRET: Environment['LIVEKIT_API_SECRET']

	@IsString()
	TELEGRAM_BOT_TOKEN: Environment['TELEGRAM_BOT_TOKEN']

	@IsString()
	DISCORD_BOT_TOKEN: Environment['DISCORD_BOT_TOKEN']

	@IsString()
	DISCORD_GUILD_ID: Environment['DISCORD_GUILD_ID']

	@IsString()
	STRIPE_SECRET_KEY: Environment['STRIPE_SECRET_KEY']

	@IsString()
	STRIPE_WEBHOOK_SECRET: Environment['STRIPE_WEBHOOK_SECRET']
}

export function validate(config: Record<string, unknown>) {
	const validatedConfig = plainToInstance(EnvironmentVariables, config, {
		enableImplicitConversion: true
	})

	const errors = validateSync(validatedConfig, {
		skipMissingProperties: false
	})

	if (errors.length > 0) {
		throw new Error(errors.toString())
	}
	return validatedConfig
}
