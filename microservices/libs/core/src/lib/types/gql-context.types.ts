import { User } from '@prisma-clients/auth';
import type { Request, Response } from 'express';

export interface GqlContext {
  req: Request & {
    user?: User;
  };
  res: Response;
}
