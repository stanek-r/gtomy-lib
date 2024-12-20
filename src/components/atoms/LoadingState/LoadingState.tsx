import { twMerge } from 'tailwind-merge';
import { Typography } from '@/components/atoms/Typography/Typography';
import { useTranslation } from 'react-i18next';

export const loadingVariants = {
  spinner: 'loading-spinner',
  dots: 'loading-dots',
  ring: 'loading-ring',
  ball: 'loading-ball',
  bars: 'loading-bars',
  infinity: 'loading-infinity',
};

export const loadingSizes = {
  xs: 'loading-xs',
  sm: 'loading-sm',
  md: 'loading-md',
  lg: 'loading-lg',
};

export const loadingTextSizes = {
  xs: 'sm',
  sm: 'base',
  md: 'lg',
  lg: 'xl',
};

export interface LoadingStateProps {
  message?: string;
  showLoading: boolean;
  variant?: 'spinner' | 'dots' | 'ring' | 'ball' | 'bars' | 'infinity';
  layout?: 'column' | 'row';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
  hideMessage?: boolean;
}

export function LoadingState({
  message,
  showLoading,
  variant = 'ring',
  size = 'lg',
  layout = 'column',
  className,
  hideMessage,
}: LoadingStateProps) {
  const { t } = useTranslation('common');

  if (!showLoading) {
    return null;
  }

  return (
    <div className={twMerge('flex items-center gap-2', layout === 'column' ? 'flex-col' : 'flex-row', className)}>
      <span className={twMerge('loading', loadingSizes[size], loadingVariants[variant])}></span>
      {!hideMessage && <Typography size={loadingTextSizes[size] as any}>{message ?? t('state.loading')}</Typography>}
    </div>
  );
}
