import { Field, ID, ObjectType } from '@nestjs/graphql'

import type { Follow } from '@/src/generated/prisma/client'
import { Relation } from '@/src/shared/types/swc.types'

import { UserModel } from '../../auth/account/models/user.model'

@ObjectType()
export class FollowModel implements Follow {
	@Field(() => ID)
	public id: string

	@Field(() => UserModel)
	public follower: Relation<UserModel>

	@Field(() => String)
	public followerId: string

	@Field(() => UserModel)
	public following: Relation<UserModel>

	@Field(() => String)
	public followingId: string

	@Field(() => Date)
	public createdAt: Date

	@Field(() => Date)
	public updatedAt: Date
}
