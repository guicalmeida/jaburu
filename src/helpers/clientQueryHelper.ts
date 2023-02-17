/**
 * Checks if there's already a query with that name in cache (Map)
 * if its new, it sets the promise to its key. Avoids infinite loops
 * in client components with "use" hook
 * @returns the promise associated to that key
 * source: https://www.youtube.com/watch?v=zwQs4wXr9Bg
 */
export default function makeQueryClient() {
  const fetchMap = new Map<string, Promise<any>>()
  return function queryClient<QueryResult>(
    name: string,
    query: () => Promise<QueryResult>
  ): Promise<QueryResult> {
    if (!fetchMap.has(name)) {
      fetchMap.set(name, query())
    }
    return fetchMap.get(name)!
  }
}
