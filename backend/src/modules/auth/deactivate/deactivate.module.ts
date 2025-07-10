import { Module } from '@nestjs/common'

import { TelegramService } from '../../libs/telegram/telegram.service'

import { DeactivateResolver } from './deactivate.resolver'
import { DeactivateService } from './deactivate.service'

@Module({
	providers: [DeactivateService, DeactivateResolver, TelegramService]
})
export class DeactivateModule {}
