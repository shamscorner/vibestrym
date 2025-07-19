import { Module } from '@nestjs/common'

import { CategoryModule } from './category/category.module'
import { ChannelModule } from './channel/channel.module'
import { ChatModule } from './chat/chat.module'
import { IngressModule } from './ingress/ingress.module'
import { SponsorshipModule } from './sponsorship/sponsorship.module'
import { StreamResolver } from './stream.resolver'
import { StreamService } from './stream.service'

@Module({
	imports: [
		IngressModule,
		CategoryModule,
		ChatModule,
		ChannelModule,
		SponsorshipModule
	],
	providers: [StreamResolver, StreamService]
})
export class StreamModule {}
