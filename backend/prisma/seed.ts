import { Logger } from '@nestjs/common'
import { PrismaPg } from '@prisma/adapter-pg'
import { hash } from 'argon2'
import 'dotenv/config'
import { env } from 'prisma/config'

import { CATEGORIES } from '../src/core/prisma/data/categories.data'
import { STREAMS } from '../src/core/prisma/data/streams.data'
import {
	TEST_CHANNEL,
	TEST_FOLLOWERS,
	USERNAMES
} from '../src/core/prisma/data/users.data'
import { Prisma, PrismaClient } from '../src/generated/prisma/client'

const prisma = new PrismaClient({
	adapter: new PrismaPg({
		connectionString: env('DATABASE_URL')
	}),
	transactionOptions: {
		maxWait: 5000,
		timeout: 10000,
		isolationLevel: Prisma.TransactionIsolationLevel.Serializable
	}
})

async function main() {
	try {
		Logger.log('Starting database seeding')

		await prisma.$transaction([
			prisma.user.deleteMany(),
			prisma.socialLink.deleteMany(),
			prisma.stream.deleteMany(),
			prisma.category.deleteMany(),
			prisma.follow.deleteMany()
		])

		await prisma.category.createMany({
			data: CATEGORIES
		})

		Logger.log('Categories have been successfully created')

		const categories = await prisma.category.findMany()

		const categoriesBySlug = Object.fromEntries(
			categories.map(category => [category.slug, category])
		)

		Logger.log('Creating users and their streams...')
		await prisma.$transaction(async tx => {
			for (const username of USERNAMES) {
				const userExists = await tx.user.findUnique({
					where: {
						username
					}
				})

				if (!userExists) {
					const createdUser = await tx.user.create({
						data: {
							email: `${username}@vibestrym.com`,
							password: await hash('password'),
							username,
							displayName: username,
							avatar: `channels/${username}.webp`,
							isEmailVerified: true,
							socialLinks: {
								createMany: {
									data: [
										{
											title: 'Telegram',
											url: `https://t.me/${username}`,
											position: 1
										},
										{
											title: 'YouTube',
											url: `https://youtube.com/@${username}`,
											position: 2
										}
									]
								}
							},
							notificationSettings: {
								create: {}
							}
						}
					})

					const randomCategory =
						categoriesBySlug[
							Object.keys(categoriesBySlug)[
								Math.floor(
									Math.random() *
										Object.keys(categoriesBySlug).length
								)
							]
						]

					const randomTitles: string[] = STREAMS[
						randomCategory.slug
					] as string[]

					const randomTitle =
						randomTitles[
							Math.floor(Math.random() * randomTitles.length)
						]

					await tx.stream.create({
						data: {
							title: randomTitle,
							thumbnailUrl: `streams/${createdUser.username}.webp`,
							user: {
								connect: {
									id: createdUser.id
								}
							},
							category: {
								connect: {
									id: randomCategory.id
								}
							}
						}
					})

					Logger.log(
						`User "${createdUser.username}" and their stream created successfully`
					)
				}
			}
		})

		Logger.log(
			`Creating follow relationships for channel "${TEST_CHANNEL}"`
		)
		await prisma.$transaction(async tx => {
			const channel = await tx.user.findUnique({
				where: {
					username: TEST_CHANNEL
				}
			})

			if (!channel) {
				throw new Error('Channel not found')
			}

			const users = await tx.user.findMany({
				where: {
					username: {
						in: TEST_FOLLOWERS
					}
				}
			})

			if (!users) {
				throw new Error('Users not found')
			}

			// more than 10 followers
			for (const user of users) {
				await tx.follow.create({
					data: {
						followerId: user.id,
						followingId: channel.id
					},
					include: {
						follower: true,
						following: {
							include: {
								notificationSettings: true
							}
						}
					}
				})
				Logger.log(
					`User "${user.username}" followed channel "${channel.username}" successfully`
				)
			}

			// veryfy the channel
			await tx.user.update({
				where: {
					username: TEST_CHANNEL
				},
				data: {
					isVerified: true
				}
			})
			Logger.log(
				`Channel "${TEST_CHANNEL}" has been verified successfully`
			)
		})

		Logger.log('Database seeding completed successfully')
	} catch (error) {
		Logger.error(error)
		throw new Error('Error during database seeding')
	} finally {
		Logger.log('Closing database connection...')
		await prisma.$disconnect()
		Logger.log('Database connection closed successfully')
	}
}

void main()
