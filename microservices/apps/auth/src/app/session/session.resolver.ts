import { UserAgent, type GqlContext } from '@microservices/core';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';

import { AuthModel } from '../auth.model';

import { Authorization } from './decorators/auth.decorator';
import { LoginInput } from './inputs/login.input';
import { SessionModel } from './models/session.model';
import { SessionService } from './session.service';

@Resolver('Session')
export class SessionResolver {
  constructor(private readonly sessionService: SessionService) {}

  @Authorization()
  @Query(() => SessionModel, { name: 'findCurrentSession' })
  async findCurrent(@Context() { req }: GqlContext) {
    return this.sessionService.findCurrent(req);
  }

  @Mutation(() => AuthModel, { name: 'loginUser' })
  async login(
    @Context() { req }: GqlContext,
    @Args('data') input: LoginInput,
    @UserAgent() userAgent: string
  ) {
    return this.sessionService.login(req, input, userAgent);
  }

  @Authorization()
  @Mutation(() => Boolean, { name: 'logoutUser' })
  async logout(@Context() { req }: GqlContext) {
    return this.sessionService.logout(req);
  }

  @Authorization()
  @Query(() => [SessionModel], { name: 'findSessionsByUser' })
  async findByUser(@Context() { req }: GqlContext) {
    return this.sessionService.findByUser(req);
  }

  @Authorization()
  @Mutation(() => Boolean, { name: 'removeSession' })
  async remove(@Context() { req }: GqlContext, @Args('id') id: string) {
    return this.sessionService.remove(req, id);
  }

  @Mutation(() => Boolean, { name: 'clearSessionCookie' })
  clearSession(@Context() { req }: GqlContext) {
    return this.sessionService.clearSession(req);
  }
}
