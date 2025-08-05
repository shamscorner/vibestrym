import { Injectable } from '@nestjs/common'
import { ModuleRef } from '@nestjs/core'
import { GraphQLSchemaHost } from '@nestjs/graphql'
import { HealthIndicatorService } from '@nestjs/terminus'

@Injectable()
export class GraphQLHealthIndicator {
	constructor(
		private readonly moduleRef: ModuleRef,
		private readonly healthIndicatorService: HealthIndicatorService
	) {}

	async isHealthy(key: string) {
		const indicator = this.healthIndicatorService.check(key)

		const startTime = Date.now()

		try {
			// Get the GraphQLSchemaHost from the module context
			const schemaHost = this.moduleRef.get(GraphQLSchemaHost, {
				strict: false
			})

			if (!schemaHost) {
				return indicator.down({
					error: 'GraphQLSchemaHost not found - GraphQL module may not be properly configured'
				})
			}

			const schema = schemaHost.schema

			if (!schema) {
				return indicator.down({
					error: 'GraphQL schema not available'
				})
			}

			// Import graphql functions dynamically to avoid dependency issues
			const { graphql } = await import('graphql')

			// Test a simple introspection query
			const introspectionQuery = `
				query {
					__schema {
						queryType {
							name
						}
					}
				}
				`

			const result = await graphql({
				schema,
				source: introspectionQuery
			})

			const responseTime = Date.now() - startTime

			if (result.errors) {
				const errorMessage = `GraphQL execution errors: ${result.errors.map(e => e.message).join(', ')}`

				return indicator.down({
					error: errorMessage,
					responseTime: `${responseTime}ms`,
					queryExecuted: false
				})
			}

			return indicator.up({
				responseTime: `${responseTime}ms`,
				schemaValid: true,
				queryExecuted: true,
				schemaTypes: {
					query: schema.getQueryType()?.name || null,
					mutation: schema.getMutationType()?.name || null,
					subscription: schema.getSubscriptionType()?.name || null
				}
			})
		} catch (error: unknown) {
			const errorMessage =
				error instanceof Error ? error.message : 'Unknown error'
			return indicator.down({
				error: errorMessage,
				responseTime: `${Date.now() - startTime}ms`
			})
		}
	}
}
