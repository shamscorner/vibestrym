import { init } from '@microservices/core';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app/app.module';

async function run() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
    bufferLogs: true
  });
  await init(app, 'auth');
}

run().catch((error: Error) => {
  console.error('Failed to start Vibestrym Auth service', {
    error: error.stack
  });
  process.exit(1);
});
