import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { Logger as PinoLogger } from 'nestjs-pino';

import { CoreAppConfig } from './config';

export async function init(app: NestExpressApplication) {
  app.enableShutdownHooks();
  app.useLogger(app.get(PinoLogger));

  const config = app.get(ConfigService<CoreAppConfig, true>);

  app.use(cookieParser(config.get('cookiesSecret', { infer: true })));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true
    })
  );

  app.enableCors({
    origin: config.get('allowedOrigin', { infer: true }) || true,
    credentials: true,
    exposedHeaders: ['set-cookie']
  });

  app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        directives: {
          imgSrc: [
            `'self'`,
            'data:',
            'apollo-server-landing-page.cdn.apollographql.com'
          ],
          scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
          manifestSrc: [
            `'self'`,
            'apollo-server-landing-page.cdn.apollographql.com'
          ],
          frameSrc: [`'self'`, 'sandbox.embed.apollographql.com']
        }
      }
    })
  );

  const port =
    app
      .get(ConfigService<CoreAppConfig, true>)
      .get('application.port', { infer: true }) || 4000;

  await app.listen(port);

  app
    .get(PinoLogger)
    .log(`🚀 Application is running on: http://localhost:${port}`);
}
