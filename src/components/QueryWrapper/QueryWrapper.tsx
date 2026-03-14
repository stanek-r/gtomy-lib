import { ReactNode, useMemo } from 'react';
import { ErrorState } from '@/components/ErrorState/ErrorState';
import { LoadingState } from '@/components/LoadingState/LoadingState';
import { ErrorWithLoadingTranslations } from '@/types/translations';
import { CONFIG } from '@/utils/config';

export type QueryWrapperPropsWithoutChildren = Omit<QueryWrapperProps, 'children' | 'loadingMessage'>;

export interface QueryWrapperProps {
  children: ReactNode;
  status: 'error' | 'success' | 'pending';
  error: unknown;
  showRetry?: boolean;
  refetch: () => void;
  translation?: ErrorWithLoadingTranslations;
  className?: string;
}

export function QueryWrapper({
  children,
  status,
  error,
  showRetry,
  refetch,
  translation,
  className,
}: QueryWrapperProps): ReactNode {
  const mergedTranslations = useMemo(() => translation ?? CONFIG.errorTranslations, [translation]);

  if (status === 'error') {
    return (
      <ErrorState
        error={error}
        refetch={refetch}
        showRetry={showRetry}
        translation={mergedTranslations}
        className={className}
      />
    );
  }
  if (status === 'pending') {
    return <LoadingState message={mergedTranslations.loadingMessage} className={className} />;
  }
  return children;
}
