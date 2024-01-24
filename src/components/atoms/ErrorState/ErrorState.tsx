import React from 'react';
import { Typography } from '@/components/atoms/Typography';
import { useTranslation } from '@/utils/hooks/useTranslation';
import { Button } from '@/components/atoms/Button';
import { ArrowPathIcon } from '@heroicons/react/20/solid';
import { XCircleIcon } from '@heroicons/react/24/outline';

export interface ErrorStateProps {
  error?: any;
  showRetry?: boolean;
  retry?: () => void;
}

export function ErrorState({ error, retry, showRetry }: ErrorStateProps) {
  const { t } = useTranslation('common');

  return (
    <div role="alert" className="alert alert-error">
      <XCircleIcon className="size-8" />
      <Typography size="xl" color="error">
        {t('state.error')}
      </Typography>
      {error.message && <Typography color="error">{error.message}</Typography>}
      {!error.message && error.response?.status && (
        <Typography color="error">Status code: {error.response?.status}</Typography>
      )}
      {showRetry && (
        <Button startIcon={ArrowPathIcon} color="ghost" onClick={retry}>
          {t('state.retry')}
        </Button>
      )}
    </div>
  );
}
