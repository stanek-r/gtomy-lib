import { isSvgIcon, SvgIconType } from '@/models';
import { createElement } from 'react';
import { twMerge } from 'tailwind-merge';

export const iconSizeClasses = {
  sm: 'size-4',
  md: 'size-5',
  lg: 'size-6',
  xl: 'size-8',
};

export type IconType = JSX.Element | SvgIconType;

export interface IconProps {
  icon?: IconType;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function Icon({ icon, size = 'md', className }: IconProps): JSX.Element | null {
  if (icon == null) {
    return null;
  }
  if (isSvgIcon(icon)) {
    return createElement(icon, { className: twMerge('shrink-0', iconSizeClasses[size], className) });
  }
  return icon;
}
