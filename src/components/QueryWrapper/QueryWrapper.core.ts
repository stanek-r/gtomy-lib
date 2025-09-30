import { ReactNode } from 'react';
import { ErrorWithLoadingTranslations } from '@/types/translations';

export type QueryWrapperPropsWithoutChildren = Omit<QueryWrapperProps, 'children' | 'loadingMessage'>;

export interface QueryWrapperProps {
  children: ReactNode;
  status: 'error' | 'success' | 'pending';
  error: unknown;
  showRetry?: boolean;
  retry: () => void;
  translation: ErrorWithLoadingTranslations;
  className?: string;
}
