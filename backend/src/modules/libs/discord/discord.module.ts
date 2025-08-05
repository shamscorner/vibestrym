import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { IntentsBitField } from 'discord.js'
import { NecordModule } from 'necord'

import { AppConfig } from '@/src/core/config/app.config'

import { ChannelService } from '../../stream/channel/channel.service'

import { DiscordCommands } from './discord.commands'
import { DiscordService } from './discord.service'

@Module({
	imports: [
		ConfigModule,
		NecordModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => {
				const discordConfig =
					configService.getOrThrow<AppConfig['discord']>('discord')

				return {
					token: discordConfig.botToken,
					intents: [IntentsBitField.Flags.Guilds],
					development: [discordConfig.guildId]
				}
			},
			inject: [ConfigService]
		})
	],
	providers: [DiscordService, DiscordCommands, ChannelService]
})
export class DiscordModule {}
