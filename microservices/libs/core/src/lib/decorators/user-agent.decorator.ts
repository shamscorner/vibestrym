import { createParamDecorator, type ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

import { GqlContext } from '../types/gql-context.types'

export const UserAgent = createParamDecorator(
	(data: unknown, ctx: ExecutionContext) => {
		if (ctx.getType() === 'http') {
			const request = ctx.switchToHttp().getRequest<GqlContext['req']>()
			return request.headers['user-agent']
		} else {
			const gqlContext = GqlExecutionContext.create(ctx)
			return gqlContext.getContext<GqlContext>().req.headers['user-agent']
		}
	}
)
