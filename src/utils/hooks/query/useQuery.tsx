import React, { FunctionComponent, useCallback, useEffect, useMemo, useState } from 'react';
import {
  DefaultError,
  QueryClient,
  QueryKey,
  useQuery as useTanStackQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import { QueryWrapper, QueryWrapperProps } from './QueryWrapper';

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
  data: TData;
  QueryWrapper: FunctionComponent<{ children: JSX.Element }>;
  wrapperProps: Omit<QueryWrapperProps<TData>, 'children'>;
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
  const queryWrapperProps = useMemo(
    () => ({
      isLoading: query.isLoading,
      showLoading: showLoading,
      isError: query.isError,
      error: query.error,
      loadingMessage: loadingMessage,
      showRetry: options.showRetry,
      retry: query.refetch,
      data: query.data,
    }),
    [
      query.data,
      query.isLoading,
      query.isError,
      query.error,
      query.refetch,
      options.showRetry,
      showLoading,
      loadingMessage,
    ]
  );
  const QueryWrapperInner = useCallback(
    ({ children }: { children: JSX.Element }) => <QueryWrapper {...queryWrapperProps}>{children}</QueryWrapper>,
    [queryWrapperProps]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return {
    ...query,
    data: query.data == null ? fallbackValue : query.data,
    QueryWrapper: QueryWrapperInner,
    wrapperProps: queryWrapperProps,
  };
}
