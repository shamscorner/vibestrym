import type { Request, Response } from 'express'

import { User } from '@/prisma/generated'

export interface GqlContext {
	req: Request & {
		user?: User
	}
	res: Response
}
