import { CoreAppConfig, coreAppConfig } from '@microservices/core';

export type AppConfig = CoreAppConfig & {
	// Additional application-specific configurations can be added here
};

export const appConfig = (): AppConfig => {
	return {
		...coreAppConfig()
		// Additional application-specific configurations can be added here
	};
};
