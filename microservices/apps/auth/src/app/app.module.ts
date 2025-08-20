import {
  LoggerModule,
  ThrottlerStorageRedisService
} from '@microservices/core';
import { getGraphQLConfig, GqlThrottlerGuard } from '@microservices/graphql';
import { RedisModule, RedisService } from '@microservices/redis';
import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { ThrottlerModule } from '@nestjs/throttler';

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
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        throttlers: [
          {
            ttl: config.getOrThrow<number>('THROTTLE_TTL'),
            limit: config.getOrThrow<number>('THROTTLE_LIMIT')
          }
        ],
        storage: new ThrottlerStorageRedisService(RedisService.getClient())
      })
    }),
    AccountModule,
    UsersModule,
    SessionModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: GqlThrottlerGuard
    }
  ]
})
export class AppModule {}
