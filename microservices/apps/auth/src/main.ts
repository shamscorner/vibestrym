import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { AppConfig } from './app/config/app.config';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const config = app.get(ConfigService<AppConfig, true>);

	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true
		})
	);

	app.enableCors({
		origin: config.get('allowedOrigin', { infer: true }) || '*',
		credentials: true,
		exposedHeaders: ['set-cookie']
	});

	const port = config.get('application.port', { infer: true }) || 3000;
	await app.listen(port);

	Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();
