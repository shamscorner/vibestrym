import {
	BadRequestException,
	Injectable,
	type NestMiddleware
} from '@nestjs/common'
import type { NextFunction, Request, Response } from 'express'
import * as getRawBody from 'raw-body'

@Injectable()
export class RawBodyMiddleware implements NestMiddleware {
	public use(request: Request, _: Response, next: NextFunction) {
		if (!request.readable) {
			return next(new BadRequestException('Invalid request data'))
		}

		getRawBody(request, { encoding: 'utf-8' })
			.then(rawBody => {
				request.body = rawBody
				next()
			})
			.catch(error => {
				throw new BadRequestException(
					'Error while retrieving: ',
					error as string
				)
			})
	}
}
