import React, { useMemo } from 'react';
import { Typography } from '@/components/atoms/Typography';
import { useTranslation } from '@/utils/hooks/useTranslation';
import { Button } from '@/components/atoms/Button';
import { ArrowPathIcon, LockClosedIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { twMerge } from 'tailwind-merge';
import { isAxiosError } from 'axios';

export interface ErrorStateProps {
  error?: any;
  showRetry?: boolean;
  retry?: () => void;
  className?: string;
}

export function ErrorState({ error, retry, showRetry, className }: ErrorStateProps) {
  const { t } = useTranslation('common');

  const isForbiddenError = useMemo(() => isAxiosError(error) && error.response?.status === 403, [error]);

  if (isForbiddenError) {
    return (
      <div role="alert" className={twMerge('alert alert-warning', className)}>
        <LockClosedIcon className="size-8" />
        <Typography size="xl" color="warning">
          {t('noAccess.title', { ns: 'auth' })}
        </Typography>
      </div>
    );
  }

  return (
    <div role="alert" className={twMerge('alert alert-error', className)}>
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
