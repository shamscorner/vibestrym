import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import type { ApolloDriverConfig } from '@nestjs/apollo'
import { ConfigService } from '@nestjs/config'
import { join } from 'path'

import { GqlLoggingPlugin } from '@/src/modules/libs/logger/gql-logger.plugin'
import { isDev } from '@/src/shared/utils/is-dev.util'

export function getGraphQLConfig(
	configService: ConfigService
): ApolloDriverConfig {
	const graphqlPath = configService.getOrThrow<string>('GRAPHQL_PREFIX')

	return {
		// graphiql: isDev(configService),
		playground: false,
		path: graphqlPath,
		autoSchemaFile: join(process.cwd(), 'src/core/graphql/schema.gql'),
		sortSchema: true,
		plugins: [
			...(isDev(configService)
				? [ApolloServerPluginLandingPageLocalDefault()]
				: []),
			new GqlLoggingPlugin()
			// more plugins can be added here
		],
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		context: ({ req, res }) => ({ req, res }),
		subscriptions: {
			'graphql-ws': {
				path: graphqlPath
			},
			'subscriptions-transport-ws': false // Disable legacy transport
		},
		// Add this to ensure WebSocket server starts
		installSubscriptionHandlers: true
	}
}
