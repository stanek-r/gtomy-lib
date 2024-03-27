import { isSvgIcon, SvgIconType } from '@/models';
import { createElement } from 'react';
import { twMerge } from 'tailwind-merge';
import { typographyColorClasses, typographyContentColorClasses } from '@/components/atoms/Typography';

export const iconSizeClasses = {
  sm: 'size-4',
  md: 'size-5',
  lg: 'size-6',
  xl: 'size-8',
  '2xl': 'size-10',
};

export type IconType = JSX.Element | SvgIconType;

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

export function Icon({
  icon,
  size = 'md',
  color = 'inherit',
  content = true,
  className,
}: IconProps): JSX.Element | null {
  if (icon == null) {
    return null;
  }
  if (isSvgIcon(icon)) {
    return createElement(icon, {
      className: twMerge(
        'shrink-0',
        iconSizeClasses[size],
        color && (content ? typographyContentColorClasses[color] : typographyColorClasses[color]),
        className
      ),
      'aria-hidden': true,
    });
  }
  return icon;
}
