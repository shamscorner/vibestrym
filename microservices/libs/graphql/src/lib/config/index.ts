import { getEnv } from '@microservices/core';

export interface GqlEnvironment {
	GRAPHQL_PREFIX: string;
	APOLLO_GRAPH_REF: string;
}

export type GqlConfig = {
	graphql: {
		prefix: string;
		apolloGraphRef: string;
	};
};

export const gqlConfig = (): GqlConfig => ({
	graphql: {
		prefix: getEnv<GqlEnvironment, 'GRAPHQL_PREFIX'>(
			'GRAPHQL_PREFIX',
			'/graphql'
		),
		apolloGraphRef: getEnv<GqlEnvironment, 'APOLLO_GRAPH_REF'>(
			'APOLLO_GRAPH_REF'
		)
	}
});

export * from './graphql.config';
