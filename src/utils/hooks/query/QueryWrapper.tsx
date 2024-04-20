import React from 'react';
import { ErrorState } from '@/components/atoms/ErrorState';
import { LoadingState } from '@/components/atoms/LoadingState';

export type QueryWrapperPropsWithoutChildren<T> = Omit<QueryWrapperProps<T>, 'children'>;

export function combineQueryWrapperProps<T1, T2>(
  wrapperProps1: QueryWrapperPropsWithoutChildren<T1>,
  wrapperProps2: QueryWrapperPropsWithoutChildren<T2>
): QueryWrapperPropsWithoutChildren<T1> {
  return {
    data: wrapperProps1.data != null && wrapperProps2.data != null ? wrapperProps1.data : undefined,
    isError: wrapperProps1.isError || wrapperProps2.isError,
    isLoading: wrapperProps1.isLoading || wrapperProps2.isLoading,
    showLoading: wrapperProps1.showLoading || wrapperProps2.showLoading,
    error: wrapperProps1.isError ? wrapperProps1.error : wrapperProps2.isError ? wrapperProps2.error : undefined,
    showRetry: wrapperProps1.showRetry || wrapperProps2.showRetry,
    retry: wrapperProps1.showRetry ? wrapperProps1.retry : wrapperProps2.retry,
    loadingMessage: wrapperProps1.isLoading ? wrapperProps1.loadingMessage : wrapperProps2.loadingMessage,
    fallbackValue: wrapperProps1.fallbackValue,
  };
}

export interface QueryWrapperProps<T> {
  children: JSX.Element;
  isError: boolean;
  isLoading: boolean;
  showLoading: boolean;
  error: any;
  showRetry?: boolean;
  retry: () => void;
  loadingMessage?: string;
  data?: T;
  fallbackValue: T;
}

export function QueryWrapper<T>({
  children,
  isError,
  isLoading,
  showLoading,
  error,
  showRetry,
  retry,
  loadingMessage,
  data,
  fallbackValue,
}: QueryWrapperProps<T>): JSX.Element {
  if (isError) {
    return <ErrorState error={error} retry={retry} showRetry={showRetry} />;
  }
  if (data == null || (isLoading && fallbackValue != data)) {
    return <LoadingState message={loadingMessage} showLoading={showLoading} />;
  }
  return children;
}
