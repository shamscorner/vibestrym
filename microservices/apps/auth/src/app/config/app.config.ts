import {
  CoreAppConfig,
  coreAppConfig,
  getEnv,
  StringValue
} from '@microservices/core';

export interface AuthEnvironment {
  SESSION_SECRET: string;
  SESSION_NAME: string;
  SESSION_DOMAIN: string;
  SESSION_MAX_AGE: StringValue;
  SESSION_HTTP_ONLY: boolean;
  SESSION_SECURE: boolean;
  SESSION_FOLDER: string;
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
      httpOnly: getEnv<AuthEnvironment, 'SESSION_HTTP_ONLY'>(
        'SESSION_HTTP_ONLY',
        true
      ),
      secure: getEnv<AuthEnvironment, 'SESSION_SECURE'>(
        'SESSION_SECURE',
        false
      ),
      folder: getEnv<AuthEnvironment, 'SESSION_FOLDER'>('SESSION_FOLDER')
    }
    // Additional session-related configurations can be added here
  };
};
