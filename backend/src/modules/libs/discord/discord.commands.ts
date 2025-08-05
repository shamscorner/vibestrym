import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Context, Options, SlashCommand, SlashCommandContext } from 'necord'

import { AppConfig } from '@/src/core/config/app.config'

import { ChannelService } from '../../stream/channel/channel.service'

import { DiscordService } from './discord.service'
import { UsernameInput } from './inputs/username.input'

@Injectable()
export class DiscordCommands {
	private readonly logger = new Logger(DiscordCommands.name)

	constructor(
		private readonly configService: ConfigService,
		private readonly discordService: DiscordService,
		private readonly channelService: ChannelService
	) {}

	@SlashCommand({
		name: 'ping',
		description: 'Ping command!'
	})
	public async onPing(@Context() interactions: SlashCommandContext) {
		const [interaction] = interactions
		return interaction.reply({ content: 'Pong!' })
	}

	@SlashCommand({
		name: 'find-channel-by-username',
		description: 'Find a channel by username'
	})
	public async findChannelByUsername(
		@Context() interactions: SlashCommandContext,
		@Options() { username }: UsernameInput
	) {
		const [interaction] = interactions

		if (!username) {
			return interaction.reply({ content: 'Please provide a username.' })
		}

		const channel = await this.channelService.findByUsername(username)
		if (!channel) {
			return interaction.reply({ content: 'Channel not found.' })
		}

		const appOrigin =
			this.configService.getOrThrow<AppConfig['allowedOrigin']>(
				'allowedOrigin'
			)

		return interaction.reply({
			content: channel
				? `Found channel: ${appOrigin}/${channel.displayName}`
				: 'Channel not found'
		})
	}
}
