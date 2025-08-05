import { Injectable, Logger } from '@nestjs/common'
import { Client, EmbedBuilder, TextChannel } from 'discord.js'
import { Context, ContextOf, On, Once } from 'necord'

import { NotificationData } from './notification.interface'

@Injectable()
export class DiscordService {
	private readonly logger = new Logger(DiscordService.name)

	public constructor(private readonly client: Client) {}

	@Once('ready')
	public onReady(@Context() clients: ContextOf<'ready'>) {
		const [client] = clients
		this.logger.log(`Bot logged in as ${client.user.username}`)
	}

	@On('warn')
	public onWarn(@Context() messages: ContextOf<'warn'>) {
		const [message] = messages
		this.logger.warn(message)
	}

	@On('error')
	public onError(@Context() errors: ContextOf<'error'>) {
		const [error] = errors
		this.logger.error('Discord client error:', error)
	}

	async sendNotification(
		channelId: string,
		data: NotificationData
	): Promise<boolean> {
		try {
			const channel = (await this.client.channels.fetch(
				channelId
			)) as TextChannel

			if (!channel || !(channel instanceof TextChannel)) {
				this.logger.error(
					`Channel ${channelId} not found or is not a text channel`
				)
				return false
			}

			if (!channel || !channel.isTextBased()) {
				this.logger.error(
					`Channel ${channelId} not found or is not a text channel`
				)
				return false
			}

			const embed = this.createEmbed(data)
			await channel.send({ embeds: [embed] })

			this.logger.log(`Notification sent to channel ${channelId}`)
			return true
		} catch (error) {
			this.logger.error(
				`Failed to send notification to channel ${channelId}:`,
				error
			)
			return false
		}
	}

	async sendDirectMessage(
		userId: string,
		data: NotificationData
	): Promise<boolean> {
		try {
			const user = await this.client.users.fetch(userId)

			if (!user) {
				this.logger.error(`User ${userId} not found`)
				return false
			}

			const embed = this.createEmbed(data)
			await user.send({ embeds: [embed] })

			this.logger.log(`Direct message sent to user ${userId}`)
			return true
		} catch (error) {
			this.logger.error(`Failed to send DM to user ${userId}:`, error)
			return false
		}
	}

	async sendSimpleMessage(
		channelId: string,
		message: string
	): Promise<boolean> {
		try {
			const channel = (await this.client.channels.fetch(
				channelId
			)) as TextChannel

			if (!channel || !channel.isTextBased()) {
				this.logger.error(
					`Channel ${channelId} not found or is not a text channel`
				)
				return false
			}

			await channel.send(message)
			this.logger.log(`Simple message sent to channel ${channelId}`)
			return true
		} catch (error) {
			this.logger.error(
				`Failed to send message to channel ${channelId}:`,
				error
			)
			return false
		}
	}

	private createEmbed(data: NotificationData): EmbedBuilder {
		const embed = new EmbedBuilder()
			.setTitle(data.title)
			.setDescription(data.description)
			.setColor(data.color || 0x0099ff)

		if (data.fields) {
			embed.addFields(data.fields)
		}

		if (data.timestamp) {
			embed.setTimestamp()
		}

		if (data.footer) {
			embed.setFooter({ text: data.footer })
		}

		if (data.thumbnail) {
			embed.setThumbnail(data.thumbnail)
		}

		if (data.image) {
			embed.setImage(data.image)
		}

		return embed
	}

	getBotStatus(): { isReady: boolean; username?: string; guilds: number } {
		return {
			isReady: this.client.isReady(),
			username: this.client.user?.username,
			guilds: this.client.guilds.cache.size
		}
	}

	getClient(): Client {
		return this.client
	}
}
