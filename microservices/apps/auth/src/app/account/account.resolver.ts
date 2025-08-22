import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Throttle } from '@nestjs/throttler';

import { Authorization } from '../shared/decorators/auth.decorator';
import { Authorized } from '../shared/decorators/authorized.decorator';
import { CreateUserInput } from '../users/inputs/create-user.input';
import { UserModel } from '../users/models/user.model';

import { AccountService } from './account.service';

@Resolver('Account')
export class AccountResolver {
  constructor(private readonly accountService: AccountService) {}

  @Authorization()
  @Query(() => UserModel, { name: 'findProfile' })
  async me(@Authorized('id') id: string) {
    return this.accountService.me(id);
  }

  @Mutation(() => Boolean, { name: 'createAccount' })
  @Throttle({
    default: {
      limit: 2,
      ttl: 60000
    }
  })
  async createAccount(@Args('data') input: CreateUserInput) {
    return this.accountService.create(input);
  }
}
