import { getGraphQLConfig } from '@microservices/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

import { appConfig } from './config/app.config';
import { PrismaModule } from './prisma/prisma.module';

@Module({
	imports: [
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
		})
	],
	controllers: [],
	providers: []
})
export class AppModule {}
