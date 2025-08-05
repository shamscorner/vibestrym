import {
	ApolloServerPluginLandingPageLocalDefault,
	ApolloServerPluginLandingPageProductionDefault
} from '@apollo/server/plugin/landingPage/default'
import type { ApolloDriverConfig } from '@nestjs/apollo'
import { ConfigService } from '@nestjs/config'
import { join } from 'path'

import { GqlLoggingPlugin } from '@/src/modules/libs/logger/gql-logger.plugin'

import { AppConfig } from './app.config'

export function getGraphQLConfig(
	configService: ConfigService
): ApolloDriverConfig {
	const isDevelopment = process.env.NODE_ENV === 'development'

	const gqlConfig = configService.get<AppConfig['graphql']>('graphql')

	const graphqlPath = gqlConfig?.prefix || '/graphql'
	const graphqlVersion = gqlConfig?.version

	return {
		// graphiql: isDevelopment,
		playground: false,
		path: graphqlPath,
		autoSchemaFile: join(
			process.cwd(),
			`src/core/graphql/schema${graphqlVersion ? `.${graphqlVersion}` : ''}.gql`
		),
		sortSchema: true,
		plugins: [
			isDevelopment
				? ApolloServerPluginLandingPageLocalDefault({ footer: false })
				: ApolloServerPluginLandingPageProductionDefault({
						graphRef: process.env.APOLLO_GRAPH_REF,
						footer: false
					}),
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
