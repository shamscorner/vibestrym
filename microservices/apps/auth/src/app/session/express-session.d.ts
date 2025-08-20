import 'express-session';

import { SessionMetadata } from '@microservices/core';

declare module 'express-session' {
  interface SessionData {
    userId?: string;
    createdAt?: Date | string;
    metadata: SessionMetadata;
  }
}
