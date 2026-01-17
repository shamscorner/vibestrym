import { SERVER_URL } from '@/constants/url.constants'
import { type TypedDocumentNode } from '@graphql-typed-document-node/core'
import { ExecutionResult } from 'graphql'
import { useQuery, type UseQueryResult } from '@tanstack/react-query'

async function gqlFetch<TResult, TVariables>(
  url: string,
  document: TypedDocumentNode<TResult, TVariables>,
  variables?: TVariables
): Promise<ExecutionResult<TResult>> {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      query: document.loc?.source.body,
      variables
    }),
    next: {
      revalidate: 30,
    },
  })

  if (response.status !== 200) {
    throw new Error(`Failed to fetch: ${response.statusText}. Body: ${await response.text()}`)
  }

  return (await response.json()) as ExecutionResult<TResult>
}

export function useGraphQL<TResult, TVariables>(
  document: TypedDocumentNode<TResult, TVariables>,
  variables?: TVariables
): UseQueryResult<ExecutionResult<TResult>, Error> {
  const key = [(document.definitions[0] as any).name.value, variables] as const
  return useQuery<ExecutionResult<TResult>, Error, ExecutionResult<TResult>>({
    queryKey: key,
    queryFn: () => gqlFetch<TResult, TVariables>(SERVER_URL, document, variables)
  })
}
