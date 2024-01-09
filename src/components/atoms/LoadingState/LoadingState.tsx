import React from 'react';
import { Typography } from '@/components/atoms/Typography';
import { useTranslation } from 'react-i18next';

export interface LoadingStateProps {
  message?: string;
  showLoading: boolean;
}

export function LoadingState({ message, showLoading }: LoadingStateProps) {
  const { t } = useTranslation('common');

  if (!showLoading) {
    return null;
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <Typography weight="medium" size="2xl">
        {message ?? t('state.loading')}
      </Typography>
    </div>
  );
}
