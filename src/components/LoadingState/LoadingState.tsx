import { twJoin, twMerge } from 'tailwind-merge';
import {
  loadingSizes,
  LoadingStateProps,
  loadingTextSizes,
  loadingVariants,
} from '@/components/LoadingState/LoadingState.core';
import { Typography } from '@/components/Typography/Typography';
import { useGTomyContext } from '@/utils/GTomyProvider/useGTomyContext';

export function LoadingState({
  message,
  showLoading = true,
  variant = 'ring',
  size = 'lg',
  layout = 'column',
  className,
  hideMessage,
}: LoadingStateProps) {
  const gtomyContext = useGTomyContext();

  if (!showLoading) {
    return null;
  }

  return (
    <div className={twMerge('flex items-center gap-2', layout === 'column' ? 'flex-col' : 'flex-row', className)}>
      <span className={twJoin('loading', loadingSizes[size], loadingVariants[variant])}></span>
      {!hideMessage && (
        <Typography size={loadingTextSizes[size]}>{message ?? gtomyContext?.translation?.loading}</Typography>
      )}
    </div>
  );
}
