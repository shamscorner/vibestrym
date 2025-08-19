import { init, ms } from '@microservices/core';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { RedisStore } from 'connect-redis';
import session from 'express-session';

import { AppModule } from './app/app.module';
import { AppConfig } from './app/config/app.config';
import { RedisService } from './app/redis/redis.service';
import { getSessionOptions } from './app/session/utils/session.util';

async function run() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
    bufferLogs: true
  });

  const config = app.get(ConfigService<AppConfig, true>);
  const redis = app.get(RedisService);
  const sessionConfig = config.get('session', { infer: true });

  app.use(
    session({
      secret: sessionConfig.secret,
      name: sessionConfig.name,
      resave: false,
      saveUninitialized: false,
      cookie: {
        ...getSessionOptions(config),
        maxAge: ms(sessionConfig.maxAge)
      },
      store: new RedisStore({
        client: redis,
        prefix: sessionConfig.folder
      })
    })
  );

  await init(app);
}

run().catch((error: Error) => {
  console.error('Failed to start Vibestrym Auth service', {
    error: error.stack
  });
  process.exit(1);
});
