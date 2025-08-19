import { InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { User } from '@prisma-clients/auth';
import type { CookieOptions, Request } from 'express';

import { AppConfig } from '../../config/app.config';
import { RedisService } from '../../redis/redis.service';

export const USERS_SESSIONS_KEY = 'user_sessions';

export function getSessionOptions(configService: ConfigService) {
  const sessionConfig =
    configService.getOrThrow<AppConfig['session']>('session');

  return {
    domain: sessionConfig.domain,
    path: '/', // Important: must match the original
    httpOnly: sessionConfig.httpOnly,
    secure: sessionConfig.secure,
    sameSite: 'lax'
  } as CookieOptions;
}

export function saveSession(
  redisService: RedisService,
  request: Request,
  user: User
) {
  return new Promise((resolve, reject) => {
    request.session.createdAt = new Date();
    request.session.userId = user.id;

    request.session.save(err => {
      console.log('session save error:', err);
      if (err) {
        return reject(
          new InternalServerErrorException('Failed to save session')
        );
      }

      redisService
        .sadd(`${USERS_SESSIONS_KEY}:${user.id}`, request.session.id)
        .then(() => resolve({ user }))
        .catch(() => resolve({ user }));
    });
  });
}

export function destroySession(
  configService: ConfigService,
  redisService: RedisService,
  request: Request,
  userId: string
) {
  // Store sessionId to use after session destruction
  const sessionId = request.session.id;

  return new Promise((resolve, reject) => {
    request.session.destroy(err => {
      if (err) {
        return reject(
          new InternalServerErrorException('Failed to destroy session')
        );
      }

      // Clear cookie with the SAME options used when setting it
      request.res?.clearCookie(
        configService.getOrThrow<AppConfig['session']['name']>('session.name'),
        getSessionOptions(configService)
      );

      redisService
        .srem(`${USERS_SESSIONS_KEY}:${userId}`, sessionId)
        .then(() => {
          resolve(true);
        })
        .catch(() => {
          resolve(true);
        });
    });
  });
}
