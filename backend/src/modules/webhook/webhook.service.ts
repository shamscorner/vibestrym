import { Injectable, Logger } from '@nestjs/common'

import { PrismaService } from '@/src/core/prisma/prisma.service'

import { LivekitService } from '../libs/livekit/livekit.service'

@Injectable()
export class WebhookService {
	private readonly logger = new Logger(WebhookService.name)

	constructor(
		private readonly prismaService: PrismaService,
		private readonly livekitService: LivekitService
	) {}

	async receiveWebhookLivekit(body: string, authorization: string) {
		const event = await this.livekitService.receiver.receive(
			body,
			authorization,
			true
		)

		if (event.event === 'ingress_started') {
			await this.prismaService.stream.update({
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
		}

		if (event.event === 'ingress_ended') {
			await this.prismaService.stream.update({
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
		}
	}
}
