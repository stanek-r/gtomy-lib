import { useEffect, useMemo } from 'react';
import {
  DefaultError,
  QueryClient,
  QueryKey,
  useQuery as useTanStackQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import { QueryWrapperProps } from './QueryWrapper';
import { showToast } from '@/components/organisms/toast';
import i18n from '@/utils/i18n';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { isAxiosError } from 'axios';

export interface QueryOptions<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> extends UseQueryOptions<TQueryFnData, TError, TData, TQueryKey> {
  showRetry?: boolean;
}

export type QueryResult<TData = unknown, TError = DefaultError> = {
  wrapperProps: Omit<QueryWrapperProps<TData>, 'children'>;
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
  const query = useTanStackQuery(options, queryClient);

  const queryWrapperProps = useMemo(
    () => ({
      error: query.error,
      status: query.status,
      showRetry: options.showRetry,
      retry: query.refetch,
    }),
    [query.status, query.error, query.refetch, options.showRetry]
  );

  useEffect(() => {
    if (query.status !== 'error') {
      return;
    }
    if (isAxiosError(query.error) && (query.error.response?.status === 401 || query.error.response?.status === 403)) {
      return;
    }
    showToast({
      message: i18n.t('state.error'),
      icon: XMarkIcon,
      iconColor: 'error',
    });
  }, [query.status, query.error]);

  return {
    ...query,
    wrapperProps: queryWrapperProps,
  };
}
