import { ReactNode } from 'react';
import { QueryWrapperProps } from '@/components/QueryWrapper/QueryWrapper.core';
import { ErrorState } from '@/components/ErrorState/ErrorState';
import { LoadingState } from '@/components/LoadingState/LoadingState';

export function QueryWrapper({ children, status, error, showRetry, retry, translation }: QueryWrapperProps): ReactNode {
  if (status === 'error') {
    return <ErrorState error={error} retry={retry} showRetry={showRetry} translation={translation} />;
  }
  if (status === 'pending') {
    return <LoadingState message={translation.loadingMessage} />;
  }
  return children;
}
