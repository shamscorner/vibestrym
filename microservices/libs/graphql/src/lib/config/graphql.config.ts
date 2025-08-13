import { GqlConfig } from '.';
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault
} from '@apollo/server/plugin/landingPage/default';
import { CoreAppConfig } from '@microservices/core';
import type { ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigService } from '@nestjs/config';

import { GqlLoggingPlugin } from '../plugins';

export function getGraphQLConfig(
  configService: ConfigService
): ApolloDriverConfig {
  const isDevelopment =
    configService.get<CoreAppConfig['env']['type']>('NODE_ENV') ===
    'development';

  const gqlConfig = configService.get<GqlConfig['graphql']>('graphql');

  return {
    // graphiql: isDevelopment,
    playground: false,
    path: gqlConfig?.prefix || '/graphql',
    autoSchemaFile: true,
    sortSchema: true,
    plugins: [
      isDevelopment
        ? ApolloServerPluginLandingPageLocalDefault({ footer: false })
        : ApolloServerPluginLandingPageProductionDefault({
            graphRef: gqlConfig?.apolloGraphRef,
            footer: false
          }),
      new GqlLoggingPlugin()
      // more plugins can be added here
    ],
    context: ({ req, res }: { req: unknown; res: unknown }) => ({ req, res })
  };
}
