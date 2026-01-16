import { Injectable, Logger } from '@nestjs/common'

import { PrismaService } from '@/src/core/prisma/prisma.service'
// import { Cron, CronExpression } from '@nestjs/schedule'

import { User } from '@/src/generated/prisma/client'

import { MailService } from '../libs/mail/mail.service'
import { StorageService } from '../libs/storage/storage.service'
import { TelegramService } from '../libs/telegram/telegram.service'
import { NotificationService } from '../notification/notification.service'

@Injectable()
export class CronService {
	private readonly logger = new Logger(CronService.name)

	constructor(
		private readonly prismaService: PrismaService,
		private readonly mailService: MailService,
		private readonly storageService: StorageService,
		private readonly telegramService: TelegramService,
		private readonly notificationService: NotificationService
	) {}

	// @Cron(CronExpression.EVERY_10_SECONDS) // only for testing purposes
	// @Cron(CronExpression.EVERY_DAY_AT_1AM) // runs every day at 1 AM
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
			// Site notification is not needed here cause the user is deactivated
			if (
				user.notificationSettings?.telegramNotifications &&
				user.telegramId
			) {
				await this.telegramService.sendAccountDeletion(user.telegramId)
				this.logger.log(
					`Sent account deletion Telegram message to ${user.telegramId}`
				)
			}

			void this.deleteUserAvatar(user)
			void this.deleteStreamThumbnail(user.stream?.thumbnailUrl)
			this.logger.log(`Sent account deletion email to ${user.email}`)
			await this.throttleExecution()
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

	// @Cron(CronExpression.EVERY_10_SECONDS) // only for testing purposes
	// @Cron(CronExpression.EVERY_4_HOURS)
	async notifyUsersEnableTwoFactor() {
		this.logger.log(
			'Running cron job to notify users to enable two-factor authentication'
		)

		const users = await this.prismaService.user.findMany({
			where: {
				isTotpEnabled: false
			},
			include: {
				notificationSettings: true
			}
		})

		for (const user of users) {
			await this.mailService.sendEnableTwoFactor(user.email)
			this.logger.log(`Sent enable two-factor email to ${user.email}`)

			await this.notificationService.createEnableTwoFactor(user)

			await this.throttleExecution()
		}
	}

	// @Cron(CronExpression.EVERY_10_SECONDS) // only for testing purposes
	// @Cron(CronExpression.EVERY_DAY_AT_1AM)
	async verifyChannels() {
		this.logger.log('Running cron job to verify channels')

		const users = await this.prismaService.user.findMany({
			include: {
				notificationSettings: true
			}
		})

		for (const user of users) {
			const followersCount = await this.prismaService.follow.count({
				where: {
					followingId: user.id
				}
			})

			if (followersCount > 0 && !user.isVerified) {
				await this.prismaService.user.update({
					where: {
						id: user.id
					},
					data: {
						isVerified: true
					}
				})

				await this.mailService.sendVerifyChannel(user.email)
				this.logger.log(
					`Sent channel verification email to ${user.email}`
				)

				await this.notificationService.createVerifyChannel(user)

				await this.throttleExecution()
			}
		}
	}

	// @Cron(CronExpression.EVERY_10_SECONDS) // only for testing purposes
	// @Cron(CronExpression.EVERY_DAY_AT_1AM)
	async deleteOldNotifications() {
		const sevenDaysAgo = new Date()
		sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

		await this.prismaService.notification.deleteMany({
			where: {
				createdAt: {
					lte: sevenDaysAgo
				}
			}
		})

		this.logger.log(`Deleted notifications older than 7 days`)
	}

	private async deleteUserAvatar(user: User) {
		if (!user.avatar) return
		await this.storageService.remove(user.avatar)
	}

	private async deleteStreamThumbnail(thumbnailUrl?: string | null) {
		if (!thumbnailUrl) return
		await this.storageService.remove(thumbnailUrl)
	}

	private async throttleExecution() {
		// Throttle to avoid rate limits
		// Change this to a different value on production
		await new Promise(resolve => setTimeout(resolve, 2000))
	}
}
