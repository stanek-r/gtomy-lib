import React from 'react';
import { ErrorState } from '@/components/atoms/ErrorState';
import { LoadingState } from '@/components/atoms/LoadingState';

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
}: QueryWrapperProps<T>): JSX.Element {
  if (isError) {
    return <ErrorState error={error} retry={retry} showRetry={showRetry} />;
  }
  if (isLoading || data == null) {
    return <LoadingState message={loadingMessage} showLoading={showLoading} />;
  }
  return children;
}
