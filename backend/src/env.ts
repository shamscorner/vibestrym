import { StringValue } from './shared/utils/ms.util'

export interface Environment {
	NODE_ENV: 'development' | 'production' | 'test'
	LOG_LEVEL: 'info' | 'warn' | 'error' | 'debug'
	APPLICATION_PORT: number
	APPLICATION_URL: string
	THROTTLE_TTL: number
	THROTTLE_LIMIT: number
	GRAPHQL_PREFIX: string
	GRAPHQL_VERSION: string
	APOLLO_GRAPH_REF: string
	ALLOWED_ORIGIN: string
	ADMIN_EMAIL: string
	COOKIES_SECRET: string
	SESSION_SECRET: string
	SESSION_NAME: string
	SESSION_DOMAIN: string
	SESSION_MAX_AGE: StringValue
	SESSION_HTTP_ONLY: string
	SESSION_SECURE: string
	SESSION_FOLDER: string
	POSTGRES_USER: string
	POSTGRES_PASSWORD: string
	POSTGRES_HOST: string
	POSTGRES_PORT: number
	POSTGRES_DATABASE: string
	POSTGRES_URI: string
	REDIS_USER: string
	REDIS_PASSWORD: string
	REDIS_HOST: string
	REDIS_PORT: number
	REDIS_URI: string
	MAIL_HOST: string
	MAIL_PORT: number
	MAIL_LOGIN: string
	MAIL_PASSWORD: string
	MAIL_FROM: string
	TOTP_ISSUER: string
	S3_ENDPOINT: string
	S3_REGION: string
	S3_ACCESS_KEY_ID: string
	S3_SECRET_ACCESS_KEY: string
	S3_BUCKET_NAME: string
	LIVEKIT_API_URL: string
	LIVEKIT_API_KEY: string
	LIVEKIT_API_SECRET: string
	TELEGRAM_BOT_TOKEN: string
	DISCORD_BOT_TOKEN: string
	DISCORD_GUILD_ID: string
	STRIPE_SECRET_KEY: string
	STRIPE_WEBHOOK_SECRET: string
}

export const getEnv = <K extends keyof Environment>(
	key: K,
	fallback?: Environment[K]
): Environment[K] => {
	const value = process.env[key] as Environment[K] | undefined

	if (value === undefined) {
		// handle fallback falsy cases that should still be used as value
		if (fallback === 'false' || fallback === '' || fallback === 0) {
			return fallback
		}
		if (fallback) {
			return fallback
		}
		throw new Error(`Missing environment variable: ${key}.`)
	}

	return value
}
