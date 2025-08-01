import { type DynamicModule, Module } from '@nestjs/common'

import { LivekitService } from './livekit.service'
import {
	LiveKitAsyncOptions,
	type LiveKitOptions,
	LiveKitOptionsSymbol
} from './types/livekit.types'

@Module({})
export class LivekitModule {
	static register(options: LiveKitOptions): DynamicModule {
		return {
			module: LivekitModule,
			providers: [
				{
					provide: LiveKitOptionsSymbol,
					useValue: options
				},
				LivekitService
			],
			exports: [LivekitService],
			global: true
		}
	}

	static registerAsync(options: LiveKitAsyncOptions): DynamicModule {
		return {
			module: LivekitModule,
			imports: options.imports || [],
			providers: [
				{
					provide: LiveKitOptionsSymbol,
					useFactory: options.useFactory,
					inject: options.inject || []
				},
				LivekitService
			],
			exports: [LivekitService],
			global: true
		}
	}
}
