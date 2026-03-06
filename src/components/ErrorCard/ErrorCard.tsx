import { ErrorTranslations } from '@/types/translations';
import { twMerge } from 'tailwind-merge';
import { ArrowPathIcon, LockClosedIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { Icon } from '@/components/Icon/Icon';
import { Typography } from '@/components/Typography/Typography';
import { useMemo } from 'react';
import { isAxiosError } from 'axios';
import { Button } from '@/components/Button/Button';

export interface ErrorCardProps {
  error?: unknown;
  showRetry?: boolean;
  refetch?: () => void;
  className?: string;
  translation: ErrorTranslations;
}

export function ErrorCard({ error, refetch, showRetry, className, translation }: ErrorCardProps) {
  const isUnauthorizedError = isAxiosError(error) && error.response?.status === 401;
  const isForbiddenError = isAxiosError(error) && error.response?.status === 403;
  const isBadGateway = isAxiosError(error) && error.response?.status === 502;

  const message: string | null = useMemo(() => {
    if (isUnauthorizedError || isForbiddenError) {
      return translation.noPermission;
    }
    if (isBadGateway) {
      return translation.badGateway;
    }
    if (isAxiosError(error)) {
      if (error.response?.data?.message) {
        return error.response.data.message;
      } else if (error.message) {
        return error.message;
      } else if (error.response?.status) {
        return error.response.status;
      }
    }
    if (error instanceof Error) {
      return error.message;
    }
    return null;
  }, [error, isBadGateway, isForbiddenError, isUnauthorizedError, translation]);

  const icon = useMemo(() => {
    if (isUnauthorizedError || isForbiddenError) {
      return LockClosedIcon;
    }
    return XCircleIcon;
  }, [isForbiddenError, isUnauthorizedError]);

  const color = useMemo(() => {
    if (isUnauthorizedError || isForbiddenError) {
      return 'warning';
    }
    return 'error';
  }, [isForbiddenError, isUnauthorizedError]);

  const displayRetry = useMemo(() => {
    if (!showRetry) {
      return false;
    }
    if (refetch == null) {
      return false;
    }
    return !(isUnauthorizedError || isForbiddenError);
  }, [isForbiddenError, isUnauthorizedError, refetch, showRetry]);

  if (error == null) {
    return null;
  }

  return (
    <div
      className={twMerge(
        'card w-full max-w-md bg-base-100 shadow-xl border',
        color === 'error' ? 'border-error/60' : 'border-warning/60',
        className
      )}
    >
      <div className="card-body items-center text-center">
        <Icon icon={icon} color={color} content={false} size="2xl" />

        <Typography color={color} content={false} size="xl" weight="semibold">
          {translation.error}
        </Typography>
        {message != null && <Typography size="sm">{message}</Typography>}

        <div className="card-actions w-full justify-center mt-4">
          {displayRetry && (
            <Button startIcon={ArrowPathIcon} size="sm" onClick={refetch} color={color}>
              {translation.retry}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
