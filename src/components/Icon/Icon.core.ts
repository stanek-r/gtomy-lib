import { ReactElement } from 'react';
import { SvgIconType } from '@/utils/svg.core';

export const iconSizeClasses = {
  sm: 'size-4',
  md: 'size-5',
  lg: 'size-6',
  xl: 'size-8',
  '2xl': 'size-10',
};

export type IconType = ReactElement | SvgIconType;

export interface IconProps {
  icon?: IconType;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  color?:
    | 'inherit'
    | 'base'
    | 'neutral'
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'info'
    | 'success'
    | 'warning'
    | 'error';
  content?: boolean;
  className?: string;
}
