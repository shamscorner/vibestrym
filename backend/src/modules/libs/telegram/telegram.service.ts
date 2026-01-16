import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Action, Command, Ctx, Start, Update } from 'nestjs-telegraf'
import { Context, Telegraf } from 'telegraf'

import { PrismaService } from '@/src/core/prisma/prisma.service'
import {
	SponsorshipPlan,
	TokenType,
	type User
} from '@/src/generated/prisma/client'
import type { SessionMetadata } from '@/src/shared/types/session-metadata.types'

import { BUTTONS } from './telegram.buttons'
import { MESSAGES } from './telegram.messages'

type TelegramContext = Context & {
	chat: { id: number }
	message: { text: string }
}

@Update()
@Injectable()
export class TelegramService extends Telegraf {
	private readonly _token: string

	constructor(
		private readonly prismaService: PrismaService,
		private readonly configService: ConfigService
	) {
		super(configService.getOrThrow<string>('TELEGRAM_BOT_TOKEN'))
		this._token = configService.getOrThrow<string>('TELEGRAM_BOT_TOKEN')
	}

	@Start()
	async onStart(
		@Ctx()
		ctx: TelegramContext
	) {
		const chatId = ctx.chat.id.toString()
		const token = ctx.message.text.split(' ')[1]

		if (token) {
			const authToken = await this.prismaService.token.findUnique({
				where: {
					token,
					type: TokenType.TELEGRAM_AUTH
				}
			})

			if (!authToken) {
				await ctx.replyWithHTML(MESSAGES.invalidToken)
				return
			}

			const hasExpired = new Date(authToken.expiresIn) < new Date()

			if (hasExpired) {
				await ctx.replyWithHTML(MESSAGES.invalidToken)
				return
			}

			await this.connectTelegram(authToken.userId || '', chatId)

			// Delete the token after successful authentication
			await this.prismaService.token.delete({
				where: {
					id: authToken.id
				}
			})

			await ctx.replyWithHTML(MESSAGES.authSuccess, BUTTONS.authSuccess)
			return
		}

		const user = await this.findUserByChatId(chatId)

		if (user) {
			return await this.onMe(ctx)
		}

		await ctx.replyWithHTML(MESSAGES.welcome, BUTTONS.profile)
	}

	@Command('me')
	@Action('me')
	async onMe(@Ctx() ctx: TelegramContext) {
		const chatId = ctx.chat.id.toString()

		const user = await this.findUserByChatId(chatId)
		const followersCount = await this.prismaService.follow.count({
			where: {
				followingId: user?.id
			}
		})

		if (!user) {
			await ctx.replyWithHTML(
				'⚠️ You need to connect your Telegram account first.'
			)
			return
		}

		await ctx.replyWithHTML(
			MESSAGES.profile(user, followersCount),
			BUTTONS.profile
		)
	}

	@Command('follows')
	@Action('follows')
	async onFollows(@Ctx() ctx: TelegramContext) {
		const chatId = ctx.chat.id.toString()

		const user = await this.findUserByChatId(chatId)
		const follows = await this.prismaService.follow.findMany({
			where: {
				followerId: user?.id
			},
			include: {
				following: true
			}
		})

		if (user && follows.length) {
			const followsList = follows
				.map(follow => MESSAGES.follows(follow.following))
				.join('\n')

			const message = `<b>🌟 Channels you are subscribed to:</b>\n\n${followsList}`

			await ctx.replyWithHTML(message)
		} else {
			await ctx.replyWithHTML('<b>❌ You have no subscriptions.</b>')
		}
	}

	async sendPasswordResetToken(
		chatId: string,
		token: string,
		metadata: SessionMetadata
	) {
		await this.telegram.sendMessage(
			chatId,
			MESSAGES.resetPassword(token, metadata),
			{ parse_mode: 'HTML' }
		)
	}

	async sendStreamStart(chatId: string, channel: User) {
		await this.telegram.sendMessage(chatId, MESSAGES.streamStart(channel), {
			parse_mode: 'HTML'
		})
	}

	async sendNewFollowing(chatId: string, follower: User) {
		const user = await this.findUserByChatId(chatId)

		await this.telegram.sendMessage(
			chatId,
			MESSAGES.newFollowing(follower, user?.followings.length || 0),
			{
				parse_mode: 'HTML'
			}
		)
	}

	async sendDeactivateToken(
		chatId: string,
		token: string,
		metadata: SessionMetadata
	) {
		await this.telegram.sendMessage(
			chatId,
			MESSAGES.deactivate(token, metadata),
			{ parse_mode: 'HTML' }
		)
	}

	async sendAccountDeletion(chatId: string) {
		await this.telegram.sendMessage(chatId, MESSAGES.accountDeleted, {
			parse_mode: 'HTML'
		})
	}

	async sendNewSponsorship(
		chatId: string,
		plan: SponsorshipPlan,
		sponsor: User
	) {
		await this.telegram.sendMessage(
			chatId,
			MESSAGES.newSponsorship(plan, sponsor),
			{ parse_mode: 'HTML' }
		)
	}

	async sendEnableTwoFactor(chatId: string) {
		await this.telegram.sendMessage(chatId, MESSAGES.enableTwoFactor, {
			parse_mode: 'HTML'
		})
	}

	async sendVerifyChannel(chatId: string) {
		await this.telegram.sendMessage(chatId, MESSAGES.verifyChannel, {
			parse_mode: 'HTML'
		})
	}

	private async connectTelegram(userId: string, chatId: string) {
		await this.prismaService.user.update({
			where: {
				id: userId
			},
			data: {
				telegramId: chatId
			}
		})
	}

	private async findUserByChatId(chatId: string) {
		const user = await this.prismaService.user.findUnique({
			where: {
				telegramId: chatId
			},
			include: {
				followers: true,
				followings: true
			}
		})
		return user
	}
}
