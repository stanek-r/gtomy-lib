import { ReactNode } from 'react';

export type QueryWrapperPropsWithoutChildren = Omit<QueryWrapperProps, 'children' | 'loadingMessage'>;

export interface QueryWrapperProps {
  children: ReactNode;
  status: 'error' | 'success' | 'pending';
  error: unknown;
  showRetry?: boolean;
  retry: () => void;
  translation: {
    loadingMessage?: string;
    retry: string;
    error: string;
    noPermission: string;
    badGateway: string;
  };
  className?: string;
}
