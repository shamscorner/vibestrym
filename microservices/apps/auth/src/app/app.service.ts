import { Injectable } from '@nestjs/common';

import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
	constructor(private readonly prismaService: PrismaService) {}

	async getData() {
		const users = await this.prismaService.user.findMany();
		console.log(users);

		return { message: 'Hello API' };
	}
}
