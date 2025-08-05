import { Injectable, Logger } from '@nestjs/common'
import { Context, ContextOf, On } from 'necord'

import { DiscordService } from './discord.service'

@Injectable()
export class DiscordEvents {
	private readonly logger = new Logger(DiscordEvents.name)

	constructor(private readonly discordService: DiscordService) {}

	@On('guildMemberAdd')
	async onGuildMemberAdd(@Context() members: ContextOf<'guildMemberAdd'>) {
		const [member] = members
		this.logger.log(`New member joined: ${member.user.username}`)

		// Find a welcome channel (you can configure this)
		const welcomeChannel = member.guild.channels.cache.find(
			channel => channel.name === 'welcome' || channel.name === 'general'
		)

		if (welcomeChannel?.isTextBased()) {
			await this.discordService.sendNotification(welcomeChannel.id, {
				title: '🎉 Welcome!',
				description: `Welcome to the server, ${member.user.username}!`,
				color: 0x00ff00,
				thumbnail: member.user.displayAvatarURL(),
				timestamp: true,
				footer: 'Welcome System'
			})
		}
	}

	@On('messageCreate')
	async onMessage(@Context() messages: ContextOf<'messageCreate'>) {
		const [message] = messages

		// Ignore bot messages
		if (message.author.bot) return

		// Example: React to messages containing "hello bot"
		if (message.content.toLowerCase().includes('hello bot')) {
			await message.react('👋')
			await message.reply('Hello there! 👋')
		}
	}
}
