import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { User } from '@/prisma/generated'
import { RateLimit } from '@/src/modules/libs/rate-limiter/decorator/rate-limiter.decorator'
import { Authorization } from '@/src/shared/decorators/auth.decorator'
import { Authorized } from '@/src/shared/decorators/authorized.decorator'

import { ChangeNotificationsSettingsInput } from './inputs/change-notifications-settings.input'
import { ChangeNotificationsSettingsResponse } from './models/notification-settings.model'
import { NotificationModel } from './models/notification.model'
import { NotificationService } from './notification.service'

@Resolver('Notification')
export class NotificationResolver {
	constructor(private readonly notificationService: NotificationService) {}

	@Authorization()
	@Query(() => Number, { name: 'findUnreadNotificationsCount' })
	async findUnreadCount(@Authorized() user: User) {
		return this.notificationService.findUnreadCount(user)
	}

	@Authorization()
	@Query(() => [NotificationModel], { name: 'findNotificationsByUser' })
	async findByUser(@Authorized() user: User) {
		return this.notificationService.findByUser(user)
	}

	@Authorization()
	@RateLimit({
		keyPrefix: 'changeNotificationsSettings',
		points: 10,
		duration: 60,
		errorMessage:
			'Too many requests to change notification settings, please try again after one minute.'
	})
	@Mutation(() => ChangeNotificationsSettingsResponse, {
		name: 'changeNotificationsSettings'
	})
	async changeSettings(
		@Authorized() user: User,
		@Args('data') input: ChangeNotificationsSettingsInput
	) {
		return this.notificationService.changeSettings(user, input)
	}
}
