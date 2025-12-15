import { ErrorTranslations } from '@/types/translations';

export interface ErrorStateProps {
  error?: unknown;
  showRetry?: boolean;
  refetch?: () => void;
  className?: string;
  translation: ErrorTranslations;
}
