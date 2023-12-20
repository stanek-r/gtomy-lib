import React, { useEffect, useState } from 'react';
import {
  DefaultError,
  QueryClient,
  QueryKey,
  UseQueryOptions,
  UseQueryResult,
  useQuery as useTanStackQuery,
} from '@tanstack/react-query';
import { Wrapper } from './Wrapper';

export interface QueryOptions<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> extends UseQueryOptions<TQueryFnData, TError, TData, TQueryKey> {
  loadingMessage?: string;
  delay?: number;
  showRetry?: boolean;
}

export type QueryResult<TData = unknown, TError = DefaultError> = {
  Wrapper: ({ children }: { children?: JSX.Element }) => JSX.Element;
} & UseQueryResult<TData, TError>;

export function useQuery<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  options: QueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  queryClient?: QueryClient
): QueryResult<TData, TError> {
  const { loadingMessage, delay, ...queryOptions } = options;
  const query = useTanStackQuery(queryOptions, queryClient);

  const [showLoading, setShowLoading] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const QWrapper = ({ children }: { children?: JSX.Element }) => (
    <Wrapper
      isLoading={query.isLoading}
      showLoading={showLoading}
      isError={query.isError}
      error={query.error}
      loadingMessage={loadingMessage}
      showRetry={options.showRetry}
      retry={query.refetch}
    >
      {children}
    </Wrapper>
  );

  return {
    ...query,
    Wrapper: QWrapper,
  };
}
