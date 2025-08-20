import { StringValue } from '@/src/shared/utils/ms.util'
import { parseBoolean } from '@/src/shared/utils/parse-boolean.util'

import { getEnv } from '../../env'

export type AppConfig = {
	env: {
		type: 'development' | 'production' | 'test'
		logLevel: 'info' | 'warn' | 'error' | 'debug'
	}
	application: {
		port: number
		url: string
	}
	allowedOrigin: string
	throttle: {
		ttl: number
		limit: number
	}
	graphql: {
		prefix: string
		version: string
		apolloGraphRef: string
		adminEmail: string
	}
	cookiesSecret: string
	session: {
		secret: string
		name: string
		domain: string
		maxAge: StringValue
		httpOnly: boolean
		secure: boolean
		folder: string
	}
	postgres: {
		user: string
		password: string
		host: string
		port: number
		database: string
		uri: string
	}
	redis: {
		user: string
		password: string
		host: string
		port: number
		uri: string
	}
	mail: {
		host: string
		port: number
		login: string
		password: string
		from: string
	}
	totp: {
		issuer: string
	}
	s3: {
		endpoint: string
		region: string
		accessKeyId: string
		secretAccessKey: string
		bucketName: string
	}
	livekit: {
		apiUrl: string
		apiKey: string
		apiSecret: string
	}
	telegram: {
		botToken: string
	}
	discord: {
		botToken: string
		guildId: string
	}
	stripe: {
		secretKey: string
		webhookSecret: string
	}
}

export const loadAppConfig = (): AppConfig => {
	return {
		env: {
			type: getEnv('NODE_ENV', 'development'),
			logLevel: getEnv('LOG_LEVEL', 'info')
		},
		application: {
			port: getEnv('APPLICATION_PORT', 4000),
			url: getEnv('APPLICATION_URL')
		},
		allowedOrigin: getEnv('ALLOWED_ORIGIN'),
		throttle: {
			ttl: getEnv('THROTTLE_TTL', 60000),
			limit: getEnv('THROTTLE_LIMIT', 3)
		},
		graphql: {
			prefix: getEnv('GRAPHQL_PREFIX', '/graphql'),
			version: getEnv('GRAPHQL_VERSION', ''),
			apolloGraphRef: getEnv('APOLLO_GRAPH_REF'),
			adminEmail: getEnv('ADMIN_EMAIL')
		},
		cookiesSecret: getEnv('COOKIES_SECRET'),
		session: {
			secret: getEnv('SESSION_SECRET'),
			name: getEnv('SESSION_NAME'),
			domain: getEnv('SESSION_DOMAIN'),
			maxAge: getEnv('SESSION_MAX_AGE'),
			httpOnly: parseBoolean(getEnv('SESSION_HTTP_ONLY', 'true')),
			secure: parseBoolean(getEnv('SESSION_SECURE', 'false')),
			folder: getEnv('SESSION_FOLDER')
		},
		postgres: {
			user: getEnv('POSTGRES_USER'),
			password: getEnv('POSTGRES_PASSWORD'),
			host: getEnv('POSTGRES_HOST'),
			port: getEnv('POSTGRES_PORT'),
			database: getEnv('POSTGRES_DATABASE'),
			uri: getEnv('POSTGRES_URI')
		},
		redis: {
			user: getEnv('REDIS_USER'),
			password: getEnv('REDIS_PASSWORD'),
			host: getEnv('REDIS_HOST'),
			port: getEnv('REDIS_PORT'),
			uri: getEnv('REDIS_URI')
		},
		mail: {
			host: getEnv('MAIL_HOST'),
			port: getEnv('MAIL_PORT'),
			login: getEnv('MAIL_LOGIN'),
			password: getEnv('MAIL_PASSWORD'),
			from: getEnv('MAIL_FROM')
		},
		totp: {
			issuer: getEnv('TOTP_ISSUER')
		},
		s3: {
			endpoint: getEnv('S3_ENDPOINT'),
			region: getEnv('S3_REGION'),
			accessKeyId: getEnv('S3_ACCESS_KEY_ID'),
			secretAccessKey: getEnv('S3_SECRET_ACCESS_KEY'),
			bucketName: getEnv('S3_BUCKET_NAME')
		},
		livekit: {
			apiUrl: getEnv('LIVEKIT_API_URL'),
			apiKey: getEnv('LIVEKIT_API_KEY'),
			apiSecret: getEnv('LIVEKIT_API_SECRET')
		},
		telegram: {
			botToken: getEnv('TELEGRAM_BOT_TOKEN')
		},
		discord: {
			botToken: getEnv('DISCORD_BOT_TOKEN'),
			guildId: getEnv('DISCORD_GUILD_ID')
		},
		stripe: {
			secretKey: getEnv('STRIPE_SECRET_KEY'),
			webhookSecret: getEnv('STRIPE_WEBHOOK_SECRET')
		}
	}
}
