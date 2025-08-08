import { GqlConfig } from '.';
import type { ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigService } from '@nestjs/config';

export function getGraphQLConfig(
	configService: ConfigService
): ApolloDriverConfig {
	const gqlConfig = configService.get<GqlConfig['graphql']>('graphql');

	const graphqlPath = gqlConfig?.prefix || '/graphql';

	return {
		playground: true,
		path: graphqlPath,
		autoSchemaFile: true,
		sortSchema: true,
		context: ({ req, res }: { req: unknown; res: unknown }) => ({ req, res })
	};
}
