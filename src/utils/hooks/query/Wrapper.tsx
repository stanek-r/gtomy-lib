import React from 'react';
import { ErrorState, LoadingState } from '@/components/molecules/states';

export interface WrapperProps {
  children?: JSX.Element;
  isError: boolean;
  isLoading: boolean;
  showLoading: boolean;
  error: any;
  showRetry?: boolean;
  retry: () => void;
  loadingMessage?: string;
}

export function Wrapper({
  children = <></>,
  isError,
  isLoading,
  showLoading,
  error,
  showRetry,
  retry,
  loadingMessage,
}: WrapperProps): JSX.Element {
  if (isError) {
    return <ErrorState error={error} retry={retry} showRetry={showRetry} />;
  }
  if (isLoading) {
    return <LoadingState message={loadingMessage} showLoading={showLoading} />;
  }
  return children;
}
