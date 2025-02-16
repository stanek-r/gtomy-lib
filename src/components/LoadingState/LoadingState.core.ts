import { TypographySizes } from '@/components/Typography/Typography.core';

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

export const loadingTextSizes: Record<string, TypographySizes> = {
  xs: 'sm',
  sm: 'base',
  md: 'lg',
  lg: 'xl',
};

export interface LoadingStateProps {
  message?: string;
  showLoading?: boolean;
  variant?: 'spinner' | 'dots' | 'ring' | 'ball' | 'bars' | 'infinity';
  layout?: 'column' | 'row';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
  hideMessage?: boolean;
}
