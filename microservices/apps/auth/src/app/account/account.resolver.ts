import { Query, Resolver } from '@nestjs/graphql';

import { UserModel } from '../users/models/user.model';

import { AccountService } from './account.service';

@Resolver('Account')
export class AccountResolver {
	constructor(private readonly accountService: AccountService) {}

	@Query(() => UserModel, { name: 'findProfile' })
	async me() {
		// For demonstration purposes, using a hardcoded ID.
		const id = '1919919a-74f2-4e5c-965a-de3048595b9f';
		return this.accountService.me(id);
	}
}
