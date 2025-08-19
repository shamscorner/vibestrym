import { LoggerModule } from '@microservices/core';
import { getGraphQLConfig } from '@microservices/graphql';
import { RedisModule } from '@microservices/redis';
import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

import { AccountModule } from './account/account.module';
import { appConfig } from './config/app.config';
import { PrismaModule } from './prisma/prisma.module';
import { SessionModule } from './session/session.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      load: [appConfig]
    }),
    PrismaModule,
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      imports: [ConfigModule],
      useFactory: getGraphQLConfig,
      inject: [ConfigService]
    }),
    RedisModule,
    AccountModule,
    UsersModule,
    SessionModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
