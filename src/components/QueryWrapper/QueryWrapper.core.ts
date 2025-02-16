import { ReactNode } from 'react';

export type QueryWrapperPropsWithoutChildren = Omit<QueryWrapperProps, 'children' | 'loadingMessage'>;

export interface QueryWrapperProps {
  children: ReactNode;
  status: 'error' | 'success' | 'pending';
  error: unknown;
  showRetry?: boolean;
  retry: () => void;
  loadingMessage?: string;
}
