import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import Stripe from 'stripe'

import { Stream, TransactionStatus, User } from '@/prisma/generated'
import { PrismaService } from '@/src/core/prisma/prisma.service'

import { LivekitService } from '../libs/livekit/livekit.service'
import { StripeService } from '../libs/stripe/stripe.service'
import { TelegramService } from '../libs/telegram/telegram.service'
import { NotificationService } from '../notification/notification.service'

@Injectable()
export class WebhookService {
	private readonly logger = new Logger(WebhookService.name)

	constructor(
		private readonly configService: ConfigService,
		private readonly prismaService: PrismaService,
		private readonly livekitService: LivekitService,
		private readonly notificationService: NotificationService,
		private readonly telegramService: TelegramService,
		private readonly stripeService: StripeService
	) {}

	async receiveWebhookLivekit(body: string, authorization: string) {
		const event = await this.livekitService.receiver.receive(
			body,
			authorization,
			true
		)

		if (event.event === 'ingress_started') {
			const stream = await this.prismaService.stream.update({
				where: {
					ingressId: event.ingressInfo?.ingressId
				},
				data: {
					isLive: true
				},
				include: {
					user: true
				}
			})

			this.logger.log(
				`Stream ingress started for user: ${event.ingressInfo?.url} - ingressId: ${event.ingressInfo?.ingressId}`
			)

			void this.sendNotificationToFollowers(stream)
		}

		if (event.event === 'ingress_ended') {
			const stream = await this.prismaService.stream.update({
				where: {
					ingressId: event.ingressInfo?.ingressId
				},
				data: {
					isLive: false
				}
			})

			this.logger.log(
				`Stream ingress ended for user: ${event.ingressInfo?.url} - ingressId: ${event.ingressInfo?.ingressId}`
			)

			await this.prismaService.chatMessage.deleteMany({
				where: {
					streamId: stream.id
				}
			})
		}
	}

	constructStripeEvent(
		payload: string | Buffer,
		signature: string | Buffer | Array<string>
	) {
		return this.stripeService.webhooks.constructEvent(
			payload,
			signature,
			this.configService.getOrThrow<string>('STRIPE_WEBHOOK_SECRET')
		)
	}

	async receiveWebhookStripe(event: Stripe.Event) {
		const session = event.data.object as Stripe.Checkout.Session

		if (event.type === 'checkout.session.completed') {
			const planId = session.metadata?.planId
			const userId = session.metadata?.userId
			const channelId = session.metadata?.channelId

			const expiresAt = new Date()
			expiresAt.setDate(expiresAt.getDay() + 30)

			await this.prismaService.$transaction(async tx => {
				const sponsorshipSubscription =
					await tx.sponsorshipSubscription.create({
						data: {
							expiresAt,
							planId,
							userId,
							channelId
						},
						include: {
							plan: true,
							user: true,
							channel: {
								include: {
									notificationSettings: true
								}
							}
						}
					})

				await tx.transaction.updateMany({
					where: {
						stripeSubscriptionId: session.id,
						status: TransactionStatus.PENDING
					},
					data: {
						status: TransactionStatus.SUCCESS
					}
				})

				const { channel, plan, user } = sponsorshipSubscription || {}

				if (
					channel?.notificationSettings?.siteNotifications &&
					plan &&
					user
				) {
					await this.notificationService.createNewSponsorship(
						channel.id,
						plan,
						user
					)
				}

				if (
					channel?.notificationSettings?.telegramNotifications &&
					channel?.telegramId &&
					plan &&
					user
				) {
					await this.telegramService.sendNewSponsorship(
						channel.telegramId,
						plan,
						user
					)
				}
			})
		}

		if (event.type === 'checkout.session.expired') {
			await this.prismaService.transaction.updateMany({
				where: {
					stripeSubscriptionId: session.id
				},
				data: {
					status: TransactionStatus.EXPIRED
				}
			})
		}

		if (event.type === 'checkout.session.async_payment_failed') {
			await this.prismaService.transaction.updateMany({
				where: {
					stripeSubscriptionId: session.id
				},
				data: {
					status: TransactionStatus.FAILED
				}
			})
		}
	}

	private async sendNotificationToFollowers(
		stream: Stream & { user: User | null }
	) {
		const { user } = stream || {}

		if (!user) return

		const followers = await this.prismaService.follow.findMany({
			where: {
				followingId: user.id,
				follower: {
					isDeactivated: false
				}
			},
			include: {
				follower: {
					include: {
						notificationSettings: true
					}
				}
			}
		})

		const notificationPromises = followers
			.filter(
				follow =>
					follow.follower.notificationSettings?.siteNotifications
			)
			.map(follow =>
				this.notificationService.createStreamStart(
					follow.follower.id,
					user
				)
			)

		if (notificationPromises.length > 0) {
			await Promise.all(notificationPromises)
		}

		// telegram notifications
		const telegramPromises = followers
			.filter(
				follow =>
					follow.follower.notificationSettings
						?.telegramNotifications && follow.follower.telegramId
			)
			.map(follow =>
				this.telegramService.sendStreamStart(
					follow.follower.telegramId || '',
					user
				)
			)

		if (telegramPromises.length > 0) {
			await Promise.all(telegramPromises)
		}
	}
}
