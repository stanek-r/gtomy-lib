import React from 'react';
import { Text, Typography } from '@/components/atoms/Typography';
import { useTranslation } from '@/utils/hooks/useTranslation';

export interface ErrorStateProps {
  error?: any;
  showRetry?: boolean;
  retry?: () => void;
}

export function ErrorState({ error, retry, showRetry }: ErrorStateProps) {
  const { t } = useTranslation('common');

  return (
    <div className="flex flex-col items-center gap-2">
      <Typography weight="medium" size="2xl">
        {t('state.error')}
      </Typography>
      {error.message && <Text>{error.message}</Text>}
      {!error.message && error.response?.status && <Text>Status code: {error.response?.status}</Text>}
      {showRetry && (
        <button className="btn btn-primary" onClick={retry}>
          {t('state.retry')}
        </button>
      )}
    </div>
  );
}
