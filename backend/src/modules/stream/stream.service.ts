import { Injectable } from '@nestjs/common'
import GqlUpload from 'graphql-upload/Upload.mjs'

import type { Prisma, Stream, User } from '@/prisma/generated'
import { PrismaService } from '@/src/core/prisma/prisma.service'
import { uploadImage } from '@/src/shared/utils/upload.util'

import { StorageService } from '../libs/storage/storage.service'

import { ChangeStreamInfoInput } from './inputs/change-stream-info.input'
import { FiltersInput } from './inputs/filters.input'

@Injectable()
export class StreamService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly storageService: StorageService
	) {}

	async findAll(input: FiltersInput = {}) {
		const { take, skip, searchTerm } = input

		const whereClause = searchTerm
			? this.findBySearchTermFilter(searchTerm)
			: undefined

		const streams = await this.prismaService.stream.findMany({
			take: take ?? 15,
			skip: skip ?? 0,
			where: {
				user: {
					isDeactivated: false
				},
				...whereClause
			},
			include: {
				user: true
			},
			orderBy: {
				createdAt: 'desc'
			}
		})

		return streams
	}

	async findRandom() {
		const total = await this.prismaService.stream.count({
			where: {
				user: {
					isDeactivated: false
				}
			}
		})

		if (total === 0) return []

		const requestedCount = Math.min(4, total)
		const streams: Stream[] = []
		const usedIndices = new Set<number>()

		while (streams.length < requestedCount) {
			const randomSkip = Math.floor(Math.random() * total)

			if (!usedIndices.has(randomSkip)) {
				usedIndices.add(randomSkip)

				const stream = await this.prismaService.stream.findFirst({
					where: {
						user: {
							isDeactivated: false
						}
					},
					include: {
						user: true
					},
					skip: randomSkip
				})

				if (stream) {
					streams.push(stream)
				}
			}
		}

		return streams
	}

	async changeInfo(user: User, input: ChangeStreamInfoInput) {
		const { title } = input

		await this.prismaService.stream.update({
			where: {
				userId: user.id
			},
			data: {
				title
			}
		})

		return true
	}

	async changeThumbnail(user: User, file: GqlUpload['file']) {
		const stream = await this.findByUserId(user)

		const fileName = await uploadImage(
			this.storageService,
			file,
			{
				path: `/streams`,
				name: user.username,
				size: {
					width: 1280,
					height: 720
				}
			},
			stream?.thumbnailUrl
		)

		await this.prismaService.stream.update({
			where: {
				userId: user.id
			},
			data: {
				thumbnailUrl: fileName
			}
		})

		return true
	}

	async removeThumbnail(user: User) {
		const stream = await this.findByUserId(user)

		if (!stream || !stream.thumbnailUrl) return

		await this.storageService.remove(stream.thumbnailUrl)

		await this.prismaService.stream.update({
			where: {
				userId: user.id
			},
			data: {
				thumbnailUrl: null
			}
		})

		return true
	}

	private async findByUserId(user: User) {
		const stream = await this.prismaService.stream.findUnique({
			where: {
				userId: user.id
			}
		})
		return stream
	}

	private findBySearchTermFilter(
		searchTerm: string
	): Prisma.StreamWhereInput {
		return {
			OR: [
				{
					title: {
						contains: searchTerm,
						mode: 'insensitive'
					}
				},
				{
					user: {
						username: {
							contains: searchTerm,
							mode: 'insensitive'
						}
					}
				}
			]
		}
	}
}
