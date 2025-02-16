export interface ErrorStateProps {
  error?: Error | null;
  showRetry?: boolean;
  retry?: () => void;
  className?: string;
}
