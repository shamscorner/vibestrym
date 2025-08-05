import { Module } from '@nestjs/common'

import { TelegramService } from '../libs/telegram/telegram.service'

import { NotificationResolver } from './notification.resolver'
import { NotificationService } from './notification.service'

@Module({
	providers: [NotificationResolver, NotificationService, TelegramService],
	exports: [NotificationService]
})
export class NotificationModule {}
