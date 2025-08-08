import { Injectable } from '@nestjs/common';

import { CreateUserInput } from '../users/inputs/create-user.input';
import { UsersService } from '../users/users.service';

@Injectable()
export class AccountService {
	constructor(private readonly usersService: UsersService) {}

	async me(id: string) {
		return this.usersService.me(id);
	}

	async create(input: CreateUserInput) {
		return this.usersService.create(input);
	}
}
