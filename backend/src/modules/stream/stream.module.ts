import { Module } from '@nestjs/common'

import { CategoryModule } from './category/category.module'
import { ChatModule } from './chat/chat.module'
import { IngressModule } from './ingress/ingress.module'
import { StreamResolver } from './stream.resolver'
import { StreamService } from './stream.service'

@Module({
	imports: [IngressModule, CategoryModule, ChatModule],
	providers: [StreamResolver, StreamService]
})
export class StreamModule {}
