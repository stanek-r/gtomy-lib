import { QueryOptions, QueryResult, useQuery } from '@/utils/hooks/query/useQuery';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { DefaultError, QueryClient, QueryKey } from '@tanstack/react-query';
import { persistQueryClient } from '@tanstack/react-query-persist-client';

const persistedQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
      staleTime: 30 * 1000,
    },
  },
});
const sessionStoragePersister = createSyncStoragePersister({
  storage: window.sessionStorage,
});
persistQueryClient({ queryClient: persistedQueryClient, persister: sessionStoragePersister });

export function usePersistSessionQuery<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  options: QueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  queryClient: QueryClient = persistedQueryClient
): QueryResult<TData, TError> {
  return useQuery<TQueryFnData, TError, TData, TQueryKey>(options, queryClient);
}
