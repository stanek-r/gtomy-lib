import { ReactElement } from 'react';
import { ArrowPathIcon, LockClosedIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { twMerge } from 'tailwind-merge';
import { ErrorStateProps } from '@/components/ErrorState/ErrorState.core';
import { isAxiosError } from 'axios';
import { Typography } from '@/components/Typography/Typography';
import { Button } from '@/components/Button/Button';

export function ErrorState({ error, refetch, showRetry, className, translation }: ErrorStateProps) {
  const isBadRequest = isAxiosError(error) && error.response?.status === 400;
  const isUnauthorizedError = isAxiosError(error) && error.response?.status === 401;
  const isForbiddenError = isAxiosError(error) && error.response?.status === 403;
  const isBadGateway = isAxiosError(error) && error.response?.status === 502;

  if (isUnauthorizedError || isForbiddenError) {
    return (
      <div role="alert" className={twMerge('alert alert-warning', className)}>
        <LockClosedIcon className="size-8" />
        <Typography size="xl" color="warning">
          {translation.noPermission}
        </Typography>
      </div>
    );
  }

  if (isBadGateway) {
    return (
      <div role="alert" className={twMerge('alert alert-error', className)}>
        <XCircleIcon className="size-8" />
        <Typography size="xl" color="error">
          {translation.badGateway}
        </Typography>
        {showRetry && (
          <Button startIcon={ArrowPathIcon} color="ghost" onClick={refetch}>
            {translation.retry}
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
            {translation.badGateway}
          </Typography>
          {error.response?.data?.message && <Typography color="error">{error.response.data.message}</Typography>}
        </div>
        {showRetry && (
          <Button startIcon={ArrowPathIcon} color="ghost" onClick={refetch}>
            {translation.retry}
          </Button>
        )}
      </div>
    );
  }

  let message: ReactElement | null = null;
  if (error != null && isAxiosError(error)) {
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
        {translation.error}
      </Typography>
      {message}
      {showRetry && (
        <Button startIcon={ArrowPathIcon} color="ghost" onClick={refetch}>
          {translation.retry}
        </Button>
      )}
    </div>
  );
}
