import { Module } from '@nestjs/common';

import { UsersService } from '../users/users.service';

import { AccountResolver } from './account.resolver';
import { AccountService } from './account.service';

@Module({
	providers: [AccountResolver, AccountService, UsersService]
})
export class AccountModule {}
