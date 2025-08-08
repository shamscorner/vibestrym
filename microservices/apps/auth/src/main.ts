import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const config = app.get(ConfigService);

	const port = config.get('APPLICATION_PORT') || 3000;
	await app.listen(port);

	Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();
