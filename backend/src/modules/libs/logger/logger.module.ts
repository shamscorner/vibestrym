import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino'

import { AppConfig } from '@/src/core/config/app.config'

@Module({
	imports: [
		PinoLoggerModule.forRootAsync({
			useFactory: (configService: ConfigService) => {
				const isProduction =
					configService.get<AppConfig['env']['type']>('env.type') ===
					'production'

				return {
					pinoHttp: {
						transport: isProduction
							? undefined
							: {
									target: 'pino-pretty',
									options: {
										singleLine: true
									}
								},
						level: isProduction ? 'info' : 'debug'
					}
				}
			},
			inject: [ConfigService]
		})
	]
})
export class LoggerModule {}
