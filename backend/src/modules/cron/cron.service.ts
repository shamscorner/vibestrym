import { Injectable, Logger } from '@nestjs/common'

import { User } from '@/prisma/generated'
// import { Cron, CronExpression } from '@nestjs/schedule'

import { PrismaService } from '@/src/core/prisma/prisma.service'

import { MailService } from '../libs/mail/mail.service'
import { StorageService } from '../libs/storage/storage.service'
import { TelegramService } from '../libs/telegram/telegram.service'

@Injectable()
export class CronService {
	private readonly logger = new Logger(CronService.name)

	constructor(
		private readonly prismaService: PrismaService,
		private readonly mailService: MailService,
		private readonly storageService: StorageService,
		private readonly telegramService: TelegramService
	) {}

	// @Cron('*/10 * * * * *')
	// @Cron(CronExpression.EVERY_10_SECONDS) // enable & increase it on production
	async deleteDeactivatedAccounts() {
		this.logger.log('Running cron job to delete deactivated accounts')

		const sevenDaysAgo = new Date()
		sevenDaysAgo.setDate(sevenDaysAgo.getSeconds() - 10)

		const deactivatedAccounts = await this.prismaService.user.findMany({
			where: {
				isDeactivated: true,
				deactivatedAt: {
					lte: sevenDaysAgo
				}
			},
			include: {
				notificationSettings: true,
				stream: true
			}
		})

		for (const user of deactivatedAccounts) {
			await this.mailService.sendAccountDeletion(user.email)

			// Send Telegram notification if enabled
			if (
				user.notificationSettings?.telegramNotifications &&
				user.telegramId
			) {
				await this.telegramService.sendAccountDeletion(user.telegramId)
			}

			void this.deleteUserAvatar(user)
			void this.deleteStreamThumbnail(user.stream?.thumbnailUrl)
			this.logger.log(`Sent account deletion email to ${user.email}`)
		}

		await this.prismaService.user.deleteMany({
			where: {
				isDeactivated: true,
				deactivatedAt: {
					lte: sevenDaysAgo
				}
			}
		})

		this.logger.log(
			`Deleted ${deactivatedAccounts.length} deactivated accounts`
		)
	}

	private async deleteUserAvatar(user: User) {
		if (!user.avatar) return
		await this.storageService.remove(user.avatar)
	}

	private async deleteStreamThumbnail(thumbnailUrl?: string | null) {
		if (!thumbnailUrl) return
		await this.storageService.remove(thumbnailUrl)
	}
}
