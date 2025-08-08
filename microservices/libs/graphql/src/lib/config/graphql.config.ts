import { GqlConfig } from '.';
import { CoreAppConfig } from '@microservices/core';
import type { ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigService } from '@nestjs/config';

export function getGraphQLConfig(
	configService: ConfigService
): ApolloDriverConfig {
	const isDevelopment =
		configService.get<CoreAppConfig['env']['type']>('NODE_ENV') ===
		'development';

	const gqlConfig = configService.get<GqlConfig['graphql']>('graphql');

	const graphqlPath = gqlConfig?.prefix || '/graphql';

	return {
		graphiql: isDevelopment,
		playground: false,
		path: graphqlPath,
		autoSchemaFile: true,
		sortSchema: true,
		context: ({ req, res }: { req: unknown; res: unknown }) => ({ req, res })
	};
}
