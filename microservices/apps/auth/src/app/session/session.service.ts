import {
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { verify } from 'argon2';
import type { Request } from 'express';

import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';

import { LoginInput } from './inputs/login.input';
import { destroySession, saveSession } from './utils/session.util';

@Injectable()
export class SessionService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly redisService: RedisService
  ) {}

  async login(request: Request, input: LoginInput) {
    const { login, password } = input;

    const user = await this.prismaService.user.findFirst({
      where: {
        OR: [{ username: { equals: login } }, { email: { equals: login } }]
      }
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isValidPassword = await verify(user.password, password);

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid password');
    }

    // TODO: Check if email is verified, if not, send verification email

    // TODO: add session metadata

    return saveSession(this.redisService, request, user);
  }

  async logout(request: Request) {
    const userId = request.session.userId;
    if (!userId) return true;

    return destroySession(
      this.configService,
      this.redisService,
      request,
      userId
    );
  }
}
