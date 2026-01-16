import { createParamDecorator, type ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

import type { User } from '@/src/generated/prisma/client'

import { GqlContext } from '../types/gql-context.types'

export const Authorized = createParamDecorator(
	(data: keyof User, ctx: ExecutionContext) => {
		let user: User

		if (ctx.getType() === 'http') {
			user = ctx.switchToHttp().getRequest<GqlContext['req']>().user!
		} else {
			const gqlContext = GqlExecutionContext.create(ctx)
			user = gqlContext.getContext<GqlContext>().req.user!
		}

		return data ? user[data] : user
	}
)
