export interface ErrorStateProps {
  error?: unknown;
  showRetry?: boolean;
  retry?: () => void;
  className?: string;
  translation: {
    retry: string;
    error: string;
    noPermission: string;
    badGateway: string;
  };
}
