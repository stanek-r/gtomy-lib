import { QueryWrapperPropsWithoutChildren } from '@/components/QueryWrapper/QueryWrapper.core';

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
    translation: wrapperProps1.translation,
  };
}
