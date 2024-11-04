import { QueryOptions, QueryResult, useQuery } from '@/utils/hooks/query/useQuery';
import { DefaultError, QueryClient } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';

export interface PageQueryData {
  isLast: boolean;
  numberOfPages?: number;
}

export interface PageQueryOptions<
  TQueryFnData extends PageQueryData = PageQueryData,
  TError = DefaultError,
  TData extends PageQueryData = TQueryFnData,
> extends Omit<Omit<QueryOptions<TQueryFnData, TError, TData>, 'queryFn'>, 'queryKey'> {
  queryFn: (page: number, results: number) => Promise<TQueryFnData>;
  resultsPerPage: number;
  queryKey: ReadonlyArray<any>;
}

export type PageQueryResult<TData = unknown, TError = DefaultError> = QueryResult<TData, TError> & {
  prevPage: () => void;
  nextPage: () => void;
  setPage: (page: number) => void;
  isLast: boolean;
  numberOfPages: number | null;
  page: number;
  setResultsPerPage: (results: number) => void;
};

export function usePageQuery<
  TQueryFnData extends PageQueryData = PageQueryData,
  TError = DefaultError,
  TData extends PageQueryData = TQueryFnData,
>(options: PageQueryOptions<TQueryFnData, TError, TData>, queryClient?: QueryClient): PageQueryResult<TData, TError> {
  const { queryFn, resultsPerPage: defaultResultsPerPage, queryKey, ...queryOptions } = options;
  const [page, setPage] = useState<number>(0);
  const [resultsPerPage, setResultsPerPage] = useState<number>(defaultResultsPerPage);

  const pageQueryFn = useCallback(() => queryFn(page, resultsPerPage), [page, resultsPerPage, queryFn]);

  const key: ReadonlyArray<any> = [...queryKey, page];
  const query = useQuery<TQueryFnData, TError, TData, ReadonlyArray<any>>(
    { queryKey: key, queryFn: pageQueryFn, ...queryOptions },
    queryClient
  );

  const isLast = useMemo(() => {
    if (query.data == null) {
      return false;
    }
    return query.data.isLast;
  }, [query.data]);
  const numberOfPages = useMemo(() => {
    if (query.data == null) {
      return null;
    }
    return query.data.numberOfPages ?? null;
  }, [query.data]);

  return {
    prevPage: () => setPage((prev) => Math.max(prev - 1, 0)),
    nextPage: () => setPage((prev) => (isLast ? prev : prev + 1)),
    setPage: (page: number) => setPage(Math.max(numberOfPages ? Math.min(page, numberOfPages) : page, 0)),
    setResultsPerPage: (results: number) => setResultsPerPage(results),
    isLast,
    numberOfPages,
    page,
    ...query,
  };
}
