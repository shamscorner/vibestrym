import type { FactoryProvider, ModuleMetadata } from '@nestjs/common'

export const LiveKitOptionsSymbol = Symbol('LiveKitOptionsSymbol')

export type LiveKitOptions = {
	apiUrl: string
	apiKey: string
	apiSecret: string
}

export type LiveKitAsyncOptions = Pick<ModuleMetadata, 'imports'> &
	Pick<FactoryProvider<LiveKitOptions>, 'useFactory' | 'inject'>
