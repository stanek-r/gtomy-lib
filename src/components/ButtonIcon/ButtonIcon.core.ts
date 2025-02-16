import { ElementType } from 'react';
import { IconType } from '@/components/Icon/Icon.core';

export const buttonVariantClasses = {
  square: 'btn-square',
  circle: 'btn-circle',
};

export interface ButtonIconProps<T extends ElementType> {
  as?: T;
  variant?: 'square' | 'circle';
  color?: 'neutral' | 'primary' | 'secondary' | 'accent' | 'ghost' | 'link' | 'info' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'lg';
  icon: IconType;
  outline?: true;
  loading?: true;
}
