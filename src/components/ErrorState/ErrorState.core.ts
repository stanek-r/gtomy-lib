export interface ErrorStateProps {
  error?: unknown;
  showRetry?: boolean;
  retry?: () => void;
  className?: string;
}
