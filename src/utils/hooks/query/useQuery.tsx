import { useEffect, useState } from 'react';
import {
  DefaultError,
  QueryClient,
  QueryKey,
  useQuery as useTanStackQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import { QueryWrapperProps } from './QueryWrapper';

export interface QueryOptions<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> extends UseQueryOptions<TQueryFnData, TError, TData, TQueryKey> {
  loadingMessage?: string;
  delay?: number;
  showRetry?: boolean;
  fallbackValue: TData;
}

export type QueryResult<TData = unknown, TError = DefaultError> = {
  wrapperProps: Omit<QueryWrapperProps<TData>, 'children'>;
  data: TData;
} & Omit<UseQueryResult<TData, TError>, 'data'>;

export function useQuery<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  options: QueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  queryClient?: QueryClient
): QueryResult<TData, TError> {
  const { loadingMessage, delay, fallbackValue, ...queryOptions } = options;
  const query = useTanStackQuery(queryOptions, queryClient);

  const [showLoading, setShowLoading] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return {
    ...query,
    data: query.data == null ? fallbackValue : query.data,
    wrapperProps: {
      isLoading: query.isLoading,
      showLoading: showLoading,
      isError: query.isError,
      error: query.error,
      loadingMessage: loadingMessage,
      showRetry: options.showRetry,
      retry: query.refetch,
      data: query.data,
    },
  };
}
