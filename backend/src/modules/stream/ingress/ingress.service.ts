import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import {
	CreateIngressOptions,
	IngressAudioEncodingPreset,
	IngressAudioOptions,
	IngressInput,
	IngressVideoEncodingPreset,
	IngressVideoOptions,
	TrackSource
} from 'livekit-server-sdk'

import { PrismaService } from '@/src/core/prisma/prisma.service'
import type { User } from '@/src/generated/prisma/client'

import { LivekitService } from '../../libs/livekit/livekit.service'

@Injectable()
export class IngressService {
	private readonly logger = new Logger(IngressService.name)

	constructor(
		private readonly prismaService: PrismaService,
		private readonly livekitService: LivekitService
	) {}

	async create(user: User, ingressType: IngressInput) {
		await this.reset(user)

		const options: CreateIngressOptions = {
			name: user.username,
			roomName: user.id,
			participantName: user.username,
			participantIdentity: user.id
		}

		if (ingressType === IngressInput.WHIP_INPUT) {
			options.enableTranscoding = false
		} else {
			options.video = new IngressVideoOptions({
				source: TrackSource.CAMERA,
				encodingOptions: {
					case: 'preset',
					value: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS
				}
			})

			options.audio = new IngressAudioOptions({
				source: TrackSource.MICROPHONE,
				encodingOptions: {
					case: 'preset',
					value: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS
				}
			})
		}

		const ingress = await this.livekitService.ingress.createIngress(
			ingressType,
			options
		)

		this.logger.log(
			`Ingress created for user: ${user.username} - ingressId: ${ingress.ingressId}`
		)

		if (!ingress || !ingress.url || !ingress.streamKey) {
			throw new BadRequestException('Failed to create ingress stream')
		}

		await this.prismaService.stream.update({
			where: {
				userId: user.id
			},
			data: {
				ingressId: ingress.ingressId,
				serverUrl: ingress.url,
				streamKey: ingress.streamKey
			}
		})

		return true
	}

	async reset(user: User) {
		await this.resetByRoomname(user.id)
		return true
	}

	async resetByRoomname(roomName: string) {
		const ingresses = await this.livekitService.ingress.listIngress({
			roomName
		})

		const rooms = await this.livekitService.room.listRooms()

		await Promise.all(
			rooms.map(room => this.livekitService.room.deleteRoom(room.name))
		)

		await Promise.all(
			ingresses
				.filter(ingress => ingress.ingressId)
				.map(ingress =>
					this.livekitService.ingress.deleteIngress(ingress.ingressId)
				)
		)

		return true
	}
}
