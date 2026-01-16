import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'

import {
	type Notification,
	NotificationType
} from '@/src/generated/prisma/client'
import { Relation } from '@/src/shared/types/swc.types'

import { UserModel } from '../../auth/account/models/user.model'

registerEnumType(NotificationType, {
	name: 'NotificationType'
})

@ObjectType()
export class NotificationModel implements Notification {
	@Field(() => String)
	public id: string

	@Field(() => String)
	public message: string

	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	@Field(() => NotificationType)
	public type: NotificationType

	@Field(() => Boolean)
	public isRead: boolean

	@Field(() => UserModel)
	public user: Relation<UserModel>

	@Field(() => String)
	public userId: string

	@Field(() => Date)
	public createdAt: Date

	@Field(() => Date)
	public updatedAt: Date
}
