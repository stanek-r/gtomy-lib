import { QueryWrapperPropsWithoutChildren } from '@/components/QueryWrapper/QueryWrapper.core';

export function combineQueryWrapperProps(
  wrapperProps1: Omit<QueryWrapperPropsWithoutChildren, 'translation'>,
  wrapperProps2: Omit<QueryWrapperPropsWithoutChildren, 'translation'>
): Omit<QueryWrapperPropsWithoutChildren, 'translation'> {
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
    refetch: wrapperProps1.showRetry ? wrapperProps1.refetch : wrapperProps2.refetch,
  };
}
