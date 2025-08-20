import { RedisService } from '@microservices/redis';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { verify } from 'argon2';
import type { Request } from 'express';
import { SessionData } from 'express-session';

import { PrismaService } from '../prisma/prisma.service';

import { LoginInput } from './inputs/login.input';
import { getSessionMetadata } from './utils/session-metadata.util';
import {
  destroySession,
  getSessionIdWithSessionFolder,
  saveSession
} from './utils/session.util';

@Injectable()
export class SessionService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly redisService: RedisService
  ) {}

  async findCurrent(req: Request) {
    const sessionId = req.session.id;
    const session = await this.getSessionFromSessionId(sessionId);

    return {
      ...session,
      id: sessionId
    };
  }

  async login(request: Request, input: LoginInput, userAgent: string) {
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

    const metadata = getSessionMetadata(this.configService, request, userAgent);

    return saveSession(this.redisService, request, user, metadata);
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

  private async getSessionFromSessionId(
    sessionId: string
  ): Promise<SessionData | null> {
    const sessionData = await this.redisService.get(
      getSessionIdWithSessionFolder(this.configService, sessionId)
    );
    return sessionData ? (JSON.parse(sessionData) as SessionData) : null;
  }
}
