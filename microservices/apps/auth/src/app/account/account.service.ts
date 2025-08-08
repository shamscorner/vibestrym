import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AccountService {
	constructor(private readonly prismaService: PrismaService) {}

	async me(id: string) {
		return this.prismaService.user.findUnique({
			where: { id }
		});
	}
}
