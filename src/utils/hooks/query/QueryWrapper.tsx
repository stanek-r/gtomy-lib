import { ErrorState } from '@/components/atoms/ErrorState';
import { LoadingState } from '@/components/atoms/LoadingState';
import { useEffect, useState } from 'react';

export type QueryWrapperPropsWithoutChildren = Omit<QueryWrapperProps, 'children' | 'loadingMessage'>;

export function combineQueryWrapperProps(
  wrapperProps1: QueryWrapperPropsWithoutChildren,
  wrapperProps2: QueryWrapperPropsWithoutChildren
): QueryWrapperPropsWithoutChildren {
  const isError = wrapperProps1.status === 'error' || wrapperProps2.status === 'error';
  const isPending = wrapperProps1.status === 'pending' || wrapperProps2.status === 'pending';
  return {
    status: isError ? 'error' : isPending ? 'pending' : 'success',
    error:
      wrapperProps1.status === 'error'
        ? wrapperProps1.error
        : wrapperProps2.status === 'error'
          ? wrapperProps2.error
          : undefined,
    showRetry: wrapperProps1.showRetry || wrapperProps2.showRetry,
    retry: wrapperProps1.showRetry ? wrapperProps1.retry : wrapperProps2.retry,
  };
}

export interface QueryWrapperProps {
  children: JSX.Element;
  status: 'error' | 'success' | 'pending';
  error: any;
  showRetry?: boolean;
  retry: () => void;
  loadingMessage?: string;
  delay?: number;
}

export function QueryWrapper({
  children,
  status,
  error,
  showRetry,
  retry,
  loadingMessage,
  delay = 200,
}: QueryWrapperProps): JSX.Element {
  const [showLoading, setShowLoading] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (status === 'error') {
    return <ErrorState error={error} retry={retry} showRetry={showRetry} />;
  }
  if (status === 'pending') {
    return <LoadingState message={loadingMessage} showLoading={showLoading} />;
  }
  return children;
}
