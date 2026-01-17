import { SERVER_URL } from '@/constants/url.constants'
import { type TypedDocumentNode } from '@graphql-typed-document-node/core'
// import { captureException } from '@sentry/nextjs'
import { ExecutionResult, print } from 'graphql'

export async function gqlFetch<TResult, TVariables>(
  document: TypedDocumentNode<TResult, TVariables>,
  ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
): Promise<ExecutionResult<TResult>> {

  const response = await fetch(SERVER_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      query: print(document),
      variables
    }),
    next: {
      revalidate: 30,
    },
  })

  if (!response.ok) {
    // captureException(new Error(`GraphQL fetch failed: ${response.statusText}`))
    throw new Error(`Failed to fetch: ${response.statusText}. Body: ${await response.text()}`)
  }

  return response.json() as ExecutionResult<TResult>
}
