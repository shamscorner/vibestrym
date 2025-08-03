import {
	ApolloServerPlugin,
	BaseContext,
	GraphQLRequestContext,
	GraphQLRequestContextWillSendResponse,
	GraphQLRequestListener
} from '@apollo/server'
import { Plugin } from '@nestjs/apollo'
import { Logger } from '@nestjs/common'
import { v4 as uuidv4 } from 'uuid'

@Plugin()
export class GqlLoggingPlugin implements ApolloServerPlugin {
	private readonly logger = new Logger(GqlLoggingPlugin.name)

	requestDidStart(
		requestContext: GraphQLRequestContext<BaseContext>
	): Promise<void | GraphQLRequestListener<BaseContext>> {
		const { request } = requestContext
		const start = Date.now()
		const requestId = uuidv4()

		this.logger.log({
			requestId,
			headers: request.http?.headers,
			query: request.query,
			variables: request.variables
		})

		return Promise.resolve({
			willSendResponse: (
				responseContext: GraphQLRequestContextWillSendResponse<BaseContext>
			) => {
				const duration = Date.now() - start

				this.logger.log({
					requestId,
					query: request.query,
					statusCode: responseContext.response?.http?.status || 200,
					duration: `${duration}ms`
				})

				return Promise.resolve()
			}
		})
	}
}
