import { getEnv } from '../utils/env';

export interface CoreEnvironment {
	NODE_ENV: 'development' | 'production' | 'test';
	APPLICATION_PORT: number;
	APPLICATION_URL: string;
	ALLOWED_ORIGIN: string;
}

export type CoreAppConfig = {
	env: {
		type: 'development' | 'production' | 'test';
	};
	application: {
		port: number;
		url: string;
	};
	allowedOrigin: string;
};

export const coreAppConfig = (): CoreAppConfig => ({
	env: {
		type: getEnv<CoreEnvironment, 'NODE_ENV'>('NODE_ENV', 'development')
	},
	application: {
		port: getEnv<CoreEnvironment, 'APPLICATION_PORT'>('APPLICATION_PORT', 4000),
		url: getEnv<CoreEnvironment, 'APPLICATION_URL'>('APPLICATION_URL')
	},
	allowedOrigin: getEnv<CoreEnvironment, 'ALLOWED_ORIGIN'>(
		'ALLOWED_ORIGIN',
		'http://localhost:3000'
	)
});
