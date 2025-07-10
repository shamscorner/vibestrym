import { Injectable, Logger } from '@nestjs/common'

import { Stream, User } from '@/prisma/generated'
import { PrismaService } from '@/src/core/prisma/prisma.service'

import { LivekitService } from '../libs/livekit/livekit.service'
import { NotificationService } from '../notification/notification.service'

@Injectable()
export class WebhookService {
	private readonly logger = new Logger(WebhookService.name)

	constructor(
		private readonly prismaService: PrismaService,
		private readonly livekitService: LivekitService,
		private readonly notificationService: NotificationService
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
	}
}
