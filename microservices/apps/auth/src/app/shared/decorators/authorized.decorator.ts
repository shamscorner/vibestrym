import { GqlContext } from '@microservices/core';
import { createParamDecorator, type ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from '@prisma-clients/auth';

export const Authorized = createParamDecorator(
  (data: keyof User, ctx: ExecutionContext) => {
    let user: User;

    if (ctx.getType() === 'http') {
      user = ctx.switchToHttp().getRequest<GqlContext['req']>().user;
    } else {
      const gqlContext = GqlExecutionContext.create(ctx);
      user = gqlContext.getContext<GqlContext>().req.user;
    }

    return data ? user[data] : user;
  }
);
