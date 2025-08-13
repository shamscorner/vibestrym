import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';

import { CoreAppConfig } from './config';

export async function init(app: NestExpressApplication, globalPrefix = 'api') {
  app.enableShutdownHooks();

  const config = app.get(ConfigService<CoreAppConfig, true>);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true
    })
  );

  app.setGlobalPrefix(globalPrefix);

  app.enableCors({
    origin: config.get('allowedOrigin', { infer: true }) || '*',
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

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}
