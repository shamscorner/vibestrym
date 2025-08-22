import { GqlContext } from '@microservices/core';
import {
  Injectable,
  UnauthorizedException,
  type CanActivate,
  type ExecutionContext
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class GqlAuthGuard implements CanActivate {
  constructor(private readonly prismaService: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext<GqlContext>().req;

    if (typeof request.session?.userId === 'undefined') {
      throw new UnauthorizedException('User is not authenticated');
    }

    const user = await this.prismaService.user.findUnique({
      where: {
        id: request.session.userId
      }
    });

    request.user = user || undefined;

    return true;
  }
}
