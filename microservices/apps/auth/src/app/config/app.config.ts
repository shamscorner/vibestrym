import {
  CoreAppConfig,
  coreAppConfig,
  getEnv,
  parseBoolean,
  StringValue
} from '@microservices/core';

export interface AuthEnvironment {
  SESSION_SECRET: string;
  SESSION_NAME: string;
  SESSION_DOMAIN: string;
  SESSION_MAX_AGE: StringValue;
  SESSION_HTTP_ONLY: string;
  SESSION_SECURE: string;
  SESSION_FOLDER: string;
  THROTTLE_TTL: string;
  THROTTLE_LIMIT: string;
  // Additional session-related configurations can be added here
}

export type AppConfig = CoreAppConfig & {
  session: {
    secret: string;
    name: string;
    domain: string;
    maxAge: StringValue;
    httpOnly: boolean;
    secure: boolean;
    folder: string;
  };
  throttle: {
    ttl: number;
    limit: number;
  };
  // Additional session-related configurations can be added here
};

export const appConfig = (): AppConfig => {
  return {
    ...coreAppConfig(),
    session: {
      secret: getEnv<AuthEnvironment, 'SESSION_SECRET'>('SESSION_SECRET'),
      name: getEnv<AuthEnvironment, 'SESSION_NAME'>('SESSION_NAME'),
      domain: getEnv<AuthEnvironment, 'SESSION_DOMAIN'>('SESSION_DOMAIN'),
      maxAge: getEnv<AuthEnvironment, 'SESSION_MAX_AGE'>('SESSION_MAX_AGE'),
      httpOnly: parseBoolean(
        getEnv<AuthEnvironment, 'SESSION_HTTP_ONLY'>(
          'SESSION_HTTP_ONLY',
          'true'
        )
      ),
      secure: parseBoolean(
        getEnv<AuthEnvironment, 'SESSION_SECURE'>('SESSION_SECURE', 'false')
      ),
      folder: getEnv<AuthEnvironment, 'SESSION_FOLDER'>('SESSION_FOLDER')
    },
    throttle: {
      ttl: +getEnv<AuthEnvironment, 'THROTTLE_TTL'>('THROTTLE_TTL'),
      limit: +getEnv<AuthEnvironment, 'THROTTLE_LIMIT'>('THROTTLE_LIMIT')
    }
    // Additional session-related configurations can be added here
  };
};
