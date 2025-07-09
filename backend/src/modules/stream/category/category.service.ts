import { Injectable, NotFoundException } from '@nestjs/common'

import { PrismaService } from '@/src/core/prisma/prisma.service'

@Injectable()
export class CategoryService {
	public constructor(private readonly prismaService: PrismaService) {}

	public async findAll() {
		const categories = await this.prismaService.category.findMany({
			orderBy: {
				createdAt: 'desc'
			},
			include: {
				streams: {
					include: {
						user: true,
						category: true
					}
				}
			}
		})

		return categories
	}

	async findRandom() {
		const total = await this.prismaService.category.count()

		if (total === 0) return []

		const requestedCount = Math.min(7, total)
		const usedIndices = new Set<number>()

		// Generate all unique random indices upfront
		while (usedIndices.size < requestedCount) {
			const randomSkip = Math.floor(Math.random() * total)
			usedIndices.add(randomSkip)
		}

		// Fetch all categories in parallel
		const categoryPromises = Array.from(usedIndices).map(skip =>
			this.prismaService.category.findFirst({
				include: {
					streams: {
						include: {
							user: true,
							category: true
						}
					}
				},
				skip
			})
		)

		const categories = await Promise.all(categoryPromises)
		return categories.filter(Boolean) // Remove any null results
	}

	async findBySlug(slug: string) {
		const category = await this.prismaService.category.findUnique({
			where: {
				slug
			},
			include: {
				streams: {
					include: {
						user: true,
						category: true
					}
				}
			}
		})

		if (!category) {
			throw new NotFoundException('Category not found')
		}

		return category
	}
}
