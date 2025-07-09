import { Injectable } from '@nestjs/common'

import type { Prisma, Stream, User } from '@/prisma/generated'
import { PrismaService } from '@/src/core/prisma/prisma.service'

import { ChangeStreamInfoInput } from './inputs/change-stream-info.input'
import { FiltersInput } from './inputs/filters.input'

@Injectable()
export class StreamService {
	constructor(private readonly prismaService: PrismaService) {}

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
