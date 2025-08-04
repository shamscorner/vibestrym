import {
	ApolloServerPluginLandingPageLocalDefault,
	ApolloServerPluginLandingPageProductionDefault
} from '@apollo/server/plugin/landingPage/default'
import type { ApolloDriverConfig } from '@nestjs/apollo'
import { ConfigService } from '@nestjs/config'
import { join } from 'path'

import { GqlLoggingPlugin } from '@/src/modules/libs/logger/gql-logger.plugin'

export function getGraphQLConfig(
	configService: ConfigService
): ApolloDriverConfig {
	const graphqlPath = configService.getOrThrow<string>('GRAPHQL_PREFIX')

	return {
		// graphiql: process.env.NODE_ENV === 'development',
		playground: false,
		path: graphqlPath,
		autoSchemaFile: join(process.cwd(), 'src/core/graphql/schema.gql'),
		sortSchema: true,
		plugins: [
			process.env.NODE_ENV === 'production'
				? ApolloServerPluginLandingPageProductionDefault({
						graphRef: 'bdlive@current',
						footer: false
					})
				: ApolloServerPluginLandingPageLocalDefault({ footer: false }),
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
		installSubscriptionHandlers: true
	}
}
