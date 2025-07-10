import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import type { ApolloDriverConfig } from '@nestjs/apollo'
import { ConfigService } from '@nestjs/config'
import { join } from 'path'

import { isDev } from '@/src/shared/utils/is-dev.util'

export function getGraphQLConfig(
	configService: ConfigService
): ApolloDriverConfig {
	return {
		// graphiql: isDev(configService),
		playground: false,
		path: configService.getOrThrow<string>('GRAPHQL_PREFIX'),
		autoSchemaFile: join(process.cwd(), 'src/core/graphql/schema.gql'),
		sortSchema: true,
		plugins: [
			...(isDev(configService)
				? [ApolloServerPluginLandingPageLocalDefault()]
				: [])
			// more plugins can be added here
		],
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		context: ({ req, res }) => ({ req, res }),
		subscriptions: {
			'graphql-ws': true
		}
	}
}
