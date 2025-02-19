import { twJoin, twMerge } from 'tailwind-merge';
import {
  loadingSizes,
  LoadingStateProps,
  loadingTextSizes,
  loadingVariants,
} from '@/components/LoadingState/LoadingState.core';
import { Typography } from '@/components/Typography/Typography';

export function LoadingState({
  message,
  showLoading = true,
  variant = 'ring',
  size = 'lg',
  layout = 'column',
  className,
}: LoadingStateProps) {
  if (!showLoading) {
    return null;
  }

  return (
    <div className={twMerge('flex items-center gap-2', layout === 'column' ? 'flex-col' : 'flex-row', className)}>
      <span className={twJoin('loading', loadingSizes[size], loadingVariants[variant])}></span>
      {message && <Typography size={loadingTextSizes[size]}>{message}</Typography>}
    </div>
  );
}
