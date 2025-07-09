import { Module } from '@nestjs/common'

import { CategoryModule } from './category/category.module'
import { IngressModule } from './ingress/ingress.module'
import { StreamResolver } from './stream.resolver'
import { StreamService } from './stream.service'

@Module({
	imports: [IngressModule, CategoryModule],
	providers: [StreamResolver, StreamService]
})
export class StreamModule {}
