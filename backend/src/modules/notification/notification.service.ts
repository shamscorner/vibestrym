import { Injectable, Logger } from '@nestjs/common'

import { PrismaService } from '@/src/core/prisma/prisma.service'
import {
	Notification,
	NotificationSettings,
	NotificationType,
	SponsorshipPlan,
	TokenType,
	User
} from '@/src/generated/prisma/client'
import { generateToken } from '@/src/shared/utils/generate-token.util'

import { TelegramService } from '../libs/telegram/telegram.service'

import { ChangeNotificationsSettingsInput } from './inputs/change-notifications-settings.input'

type UserWithNotificationSettings = User & {
	notificationSettings: NotificationSettings | null
}

@Injectable()
export class NotificationService {
	private readonly logger = new Logger(NotificationService.name)

	constructor(
		private readonly prismaService: PrismaService,
		private readonly telegramService: TelegramService
	) {}

	async findUnreadCount(user: User) {
		const count = await this.prismaService.notification.count({
			where: {
				isRead: false,
				userId: user.id
			}
		})
		return count
	}

	async findByUser(user: User) {
		// Mark all unread notifications as read
		await this.prismaService.notification.updateMany({
			where: {
				isRead: false,
				userId: user.id
			},
			data: {
				isRead: true
			}
		})

		const notifications = await this.prismaService.notification.findMany({
			where: {
				userId: user.id
			},
			orderBy: {
				createdAt: 'desc'
			}
		})

		return notifications
	}

	public async changeSettings(
		user: User,
		input: ChangeNotificationsSettingsInput
	) {
		const { siteNotifications, telegramNotifications } = input

		const notificationSettings =
			await this.prismaService.notificationSettings.upsert({
				where: {
					userId: user.id
				},
				create: {
					siteNotifications,
					telegramNotifications,
					user: {
						connect: {
							id: user.id
						}
					}
				},
				update: {
					siteNotifications,
					telegramNotifications
				},
				include: {
					user: true
				}
			})

		// If the user has enabled Telegram notifications and does not have a Telegram ID,
		if (
			notificationSettings.telegramNotifications &&
			!notificationSettings.user.telegramId
		) {
			const telegramAuthToken = await generateToken(
				this.prismaService,
				user,
				TokenType.TELEGRAM_AUTH
			)

			return {
				notificationSettings,
				telegramAuthToken: telegramAuthToken.token
			}
		}

		// If the user has disabled Telegram notifications and has a Telegram ID,
		if (
			!notificationSettings.telegramNotifications &&
			notificationSettings.user.telegramId
		) {
			await this.prismaService.user.update({
				where: {
					id: user.id
				},
				data: {
					telegramId: null
				}
			})
		}

		return { notificationSettings }
	}

	async createStreamStart(userId: string, channel: User) {
		const notification = await this.prismaService.notification.create({
			data: {
				message: `<b className='font-medium'>Hurry up!</b>
				<p>Join the stream on the channel <a href='/${channel.username}' className='font-semibold'>${channel.displayName}</a>.</p>`,
				type: NotificationType.STREAM_START,
				user: {
					connect: {
						id: userId
					}
				}
			}
		})
		return notification
	}

	async createNewFollowing(
		followingUser: UserWithNotificationSettings,
		follower: User
	) {
		let notification: Notification | null = null

		if (followingUser.notificationSettings?.siteNotifications) {
			notification = await this.prismaService.notification.create({
				data: {
					message: `<b className='font-medium'>You have a new follower!</b>
				<p>with this user <a href='/${follower.username}' className='font-semibold'>${follower.displayName}</a>.</p>`,
					type: NotificationType.NEW_FOLLOWER,
					user: {
						connect: {
							id: followingUser.id
						}
					}
				}
			})
		}

		if (
			followingUser.notificationSettings?.telegramNotifications &&
			followingUser.telegramId
		) {
			void this.telegramService.sendNewFollowing(
				followingUser.telegramId,
				follower
			)
			this.logger.log(
				`Sent new following Telegram message to ${followingUser.telegramId}`
			)
		}

		return notification
	}

	async createNewSponsorship(
		userId: string,
		plan: SponsorshipPlan,
		sponsor: User
	) {
		const notification = await this.prismaService.notification.create({
			data: {
				message: `<b className='font-medium'>You have a new sponsor!</b>
				<p>User <a href='/${sponsor.username}' className='font-semibold'>${sponsor.displayName}</a> has become your sponsor by choosing the plan <strong>${plan.title}</strong>.</p>`,
				type: NotificationType.NEW_SPONSORSHIP,
				user: {
					connect: {
						id: userId
					}
				}
			}
		})
		return notification
	}

	async createEnableTwoFactor(user: UserWithNotificationSettings) {
		let notification: Notification | null = null

		if (user.notificationSettings?.siteNotifications) {
			notification = await this.prismaService.notification.create({
				data: {
					message: `<b className='font-medium'>Secure your account!</b>
				<p>Enable two-factor authentication in your account settings to enhance security.</p>`,
					type: NotificationType.ENABLE_TWO_FACTOR,
					userId: user.id
				}
			})
			this.logger.log(
				`Sent enable two-factor site notification to ${user.id}`
			)
		}

		if (
			user.notificationSettings?.telegramNotifications &&
			user.telegramId
		) {
			void this.telegramService.sendEnableTwoFactor(user.telegramId)
			this.logger.log(
				`Sent enable two-factor Telegram message to ${user.telegramId}`
			)
		}

		return notification
	}

	async createVerifyChannel(user: UserWithNotificationSettings) {
		let notification: Notification | null = null

		if (user.notificationSettings?.siteNotifications) {
			notification = await this.prismaService.notification.create({
				data: {
					message: `<b className='font-medium'>Congratulations!</b>
			  <p>Your channel has been verified, and you will now see a checkmark next to your channel.</p>`,
					type: NotificationType.VERIFIED_CHANNEL,
					userId: user.id
				}
			})
			this.logger.log(
				`Sent channel verification site notification to ${user.id}`
			)
		}

		if (
			user.notificationSettings?.telegramNotifications &&
			user.telegramId
		) {
			void this.telegramService.sendVerifyChannel(user.telegramId)
			this.logger.log(
				`Sent channel verification Telegram message to ${user.telegramId}`
			)
		}

		return notification
	}
}
