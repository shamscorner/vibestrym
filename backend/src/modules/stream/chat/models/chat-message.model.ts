import { Field, ID, ObjectType } from '@nestjs/graphql'

import type { ChatMessage } from '@/prisma/generated'
import { UserModel } from '@/src/modules/auth/account/models/user.model'
import { Relation } from '@/src/shared/types/swc.types'

import { StreamModel } from '../../models/stream.model'

@ObjectType()
export class ChatMessageModel implements ChatMessage {
	@Field(() => ID)
	public id: string

	@Field(() => String)
	public text: string

	@Field(() => UserModel)
	public user: Relation<UserModel>

	@Field(() => String)
	public userId: string

	@Field(() => StreamModel)
	public stream: Relation<StreamModel>

	@Field(() => String)
	public streamId: string

	@Field(() => Date)
	public createdAt: Date

	@Field(() => Date)
	public updatedAt: Date
}
