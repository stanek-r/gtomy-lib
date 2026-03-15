import { useMemo } from 'react';
import { ArrowPathIcon, LockClosedIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { twMerge } from 'tailwind-merge';
import { isAxiosError } from 'axios';
import { Typography } from '@/components/Typography/Typography';
import { Button } from '@/components/Button/Button';
import { ErrorTranslations } from '@/types/translations';
import { CONFIG } from '@/utils/config';

export interface ErrorStateProps {
  error?: unknown;
  showRetry?: boolean;
  refetch?: () => void;
  className?: string;
  translation?: ErrorTranslations;
}

export function ErrorState({ error, refetch, showRetry, className, translation }: ErrorStateProps) {
  const isBadRequest = isAxiosError(error) && error.response?.status === 400;
  const isUnauthorizedError = isAxiosError(error) && error.response?.status === 401;
  const isForbiddenError = isAxiosError(error) && error.response?.status === 403;
  const isBadGateway = isAxiosError(error) && error.response?.status === 502;

  const mergedTranslations = useMemo(() => translation ?? CONFIG.errorTranslations, [translation]);

  if (isUnauthorizedError || isForbiddenError) {
    return (
      <div role="alert" className={twMerge('alert alert-warning', className)}>
        <LockClosedIcon className="size-8" />
        <Typography size="xl" color="warning">
          {mergedTranslations.noPermission}
        </Typography>
      </div>
    );
  }

  if (isBadGateway) {
    return (
      <div role="alert" className={twMerge('alert alert-error', className)}>
        <XCircleIcon className="size-8" />
        <Typography size="xl" color="error">
          {mergedTranslations.badGateway}
        </Typography>
        {showRetry && (
          <Button startIcon={ArrowPathIcon} color="ghost" onClick={refetch}>
            {mergedTranslations.retry}
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
            {mergedTranslations.error}
          </Typography>
          {error.response?.data?.message && <Typography color="error">{error.response.data.message}</Typography>}
        </div>
        {showRetry && (
          <Button startIcon={ArrowPathIcon} color="ghost" onClick={refetch}>
            {mergedTranslations.retry}
          </Button>
        )}
      </div>
    );
  }

  return (
    <div role="alert" className={twMerge('alert alert-error', className)}>
      <XCircleIcon className="size-8" />
      <Typography size="xl" color="error">
        {mergedTranslations.error}
      </Typography>
      {showRetry && (
        <Button startIcon={ArrowPathIcon} color="ghost" onClick={refetch}>
          {mergedTranslations.retry}
        </Button>
      )}
    </div>
  );
}
