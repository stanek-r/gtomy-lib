import { useEffect, useMemo } from 'react';
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

  const isBadRequest = useMemo(() => isAxiosError(error) && error.response?.status === 400, [error]);
  const isUnauthorizedError = useMemo(() => isAxiosError(error) && error.response?.status === 401, [error]);
  const isForbiddenError = useMemo(() => isAxiosError(error) && error.response?.status === 403, [error]);
  const isBadGateway = useMemo(() => isAxiosError(error) && error.response?.status === 502, [error]);

  useEffect(() => {
    if (isAxiosError(error)) {
      console.error(error.status, error.response?.status, error.response?.statusText, error.response?.data);
    }
  }, [error]);

  if (isUnauthorizedError || isForbiddenError) {
    return (
      <div role="alert" className={twMerge('alert alert-warning', className)}>
        <LockClosedIcon className="size-8" />
        <Typography size="xl" color="warning">
          {t('noPermission.title', { ns: 'auth' })}
        </Typography>
      </div>
    );
  }

  if (isBadGateway) {
    return (
      <div role="alert" className={twMerge('alert alert-error', className)}>
        <XCircleIcon className="size-8" />
        <Typography size="xl" color="error">
          {t('state.badGateway')}
        </Typography>
        {showRetry && (
          <Button startIcon={ArrowPathIcon} color="ghost" onClick={retry}>
            {t('state.retry')}
          </Button>
        )}
      </div>
    );
  }

  if (isBadRequest) {
    return (
      <div role="alert" className={twMerge('alert alert-error', className)}>
        <XCircleIcon className="size-8" />
        <div className="flex flex-col">
          <Typography size="xl" color="error">
            {t('state.badRequest')}
          </Typography>
          {error.response?.data?.message && <Typography color="error">{error.response.data.message}</Typography>}
        </div>
        {showRetry && (
          <Button startIcon={ArrowPathIcon} color="ghost" onClick={retry}>
            {t('state.retry')}
          </Button>
        )}
      </div>
    );
  }

  let message: JSX.Element | null = null;
  if (error != null) {
    if (error.response?.data?.message) {
      message = <Typography color="error">{error.response.data.message}</Typography>;
    } else if (error.message) {
      message = <Typography color="error">{error.message}</Typography>;
    } else if (error.response?.status) {
      message = <Typography color="error">Status code: {error.response?.status}</Typography>;
    }
  }

  return (
    <div role="alert" className={twMerge('alert alert-error', className)}>
      <XCircleIcon className="size-8" />
      <Typography size="xl" color="error">
        {t('state.error')}
      </Typography>
      {message}
      {showRetry && (
        <Button startIcon={ArrowPathIcon} color="ghost" onClick={retry}>
          {t('state.retry')}
        </Button>
      )}
    </div>
  );
}
