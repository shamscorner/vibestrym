import { Injectable } from '@nestjs/common'

import {
	NotificationType,
	SponsorshipPlan,
	TokenType,
	User
} from '@/prisma/generated'
import { PrismaService } from '@/src/core/prisma/prisma.service'
import { generateToken } from '@/src/shared/utils/generate-token.util'

import { ChangeNotificationsSettingsInput } from './inputs/change-notifications-settings.input'

@Injectable()
export class NotificationService {
	constructor(private readonly prismaService: PrismaService) {}

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

	async createNewFollowing(userId: string, follower: User) {
		const notification = await this.prismaService.notification.create({
			data: {
				message: `<b className='font-medium'>You have a new follower!</b>
				<p>with this user <a href='/${follower.username}' className='font-semibold'>${follower.displayName}</a>.</p>`,
				type: NotificationType.NEW_FOLLOWER,
				user: {
					connect: {
						id: userId
					}
				}
			}
		})
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

	async createEnableTwoFactor(userId: string) {
		const notification = await this.prismaService.notification.create({
			data: {
				message: `<b className='font-medium'>Secure your account!</b>
				<p>Enable two-factor authentication in your account settings to enhance security.</p>`,
				type: NotificationType.ENABLE_TWO_FACTOR,
				userId
			}
		})
		return notification
	}

	async createVerifyChannel(userId: string) {
		const notification = await this.prismaService.notification.create({
			data: {
				message: `<b className='font-medium'>Congratulations!</b>
			  <p>Your channel has been verified, and you will now see a checkmark next to your channel.</p>`,
				type: NotificationType.VERIFIED_CHANNEL,
				userId
			}
		})
		return notification
	}
}
