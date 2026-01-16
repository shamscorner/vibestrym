import type { Request, Response } from 'express'

import { User } from '@/src/generated/prisma/client'

export interface GqlContext {
	req: Request & {
		user?: User
	}
	res: Response
}
