import React, { ReactNode } from 'react';
import { ErrorState } from '@/components/atoms/ErrorState';
import { LoadingState } from '@/components/atoms/LoadingState';

export interface QueryWrapperProps {
  children?: ReactNode;
  isError: boolean;
  isLoading: boolean;
  showLoading: boolean;
  error: any;
  showRetry?: boolean;
  retry: () => void;
  loadingMessage?: string;
}

export function QueryWrapper({
  children,
  isError,
  isLoading,
  showLoading,
  error,
  showRetry,
  retry,
  loadingMessage,
}: QueryWrapperProps): ReactNode {
  if (isError) {
    return <ErrorState error={error} retry={retry} showRetry={showRetry} />;
  }
  if (isLoading) {
    return <LoadingState message={loadingMessage} showLoading={showLoading} />;
  }
  return children;
}
