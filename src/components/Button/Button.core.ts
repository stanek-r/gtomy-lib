import { ElementType } from 'react';
import { IconType } from '@/components/Icon/Icon.core';

export const buttonColorClasses = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  success: 'btn-success',
  error: 'btn-error',
  warning: 'btn-warning',
  info: 'btn-info',
  ghost: 'btn-ghost',
};

export const buttonSizeClasses = {
  sm: 'btn-sm',
  lg: 'btn-lg',
};

export interface ButtonProps<T extends ElementType> {
  as?: T;
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'ghost';
  size?: 'sm' | 'lg';
  wide?: boolean;
  glass?: boolean;
  startIcon?: IconType;
  endIcon?: IconType;
  outline?: true;
  loading?: true;
}
