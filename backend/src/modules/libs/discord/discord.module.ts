import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { IntentsBitField } from 'discord.js'
import { NecordModule } from 'necord'

import { ChannelService } from '../../stream/channel/channel.service'

import { DiscordCommands } from './discord.commands'
import { DiscordEvents } from './discord.events'
import { DiscordService } from './discord.service'

@Module({
	imports: [
		ConfigModule,
		NecordModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				token: configService.getOrThrow<string>('DISCORD_BOT_TOKEN'),
				intents: [IntentsBitField.Flags.Guilds],
				development: [
					configService.getOrThrow<string>('DISCORD_GUILD_ID')
				]
			}),
			inject: [ConfigService]
		})
	],
	providers: [DiscordService, DiscordCommands, DiscordEvents, ChannelService]
})
export class DiscordModule {}
