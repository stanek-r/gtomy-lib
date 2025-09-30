import { ErrorTranslations } from '@/types/translations';

export interface ErrorStateProps {
  error?: unknown;
  showRetry?: boolean;
  retry?: () => void;
  className?: string;
  translation: ErrorTranslations;
}
