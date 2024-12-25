import { ElementType } from 'react';
import { twMerge } from 'tailwind-merge';
import { PropsAs } from '@/utils/typeHelpers';

export const typographyContentColorClasses = {
  inherit: 'text-inherit',
  base: 'text-base-content',
  neutral: 'text-neutral-content',
  primary: 'text-primary-content',
  secondary: 'text-secondary-content',
  accent: 'text-accent-content',
  info: 'text-info-content',
  success: 'text-success-content',
  warning: 'text-warning-content',
  error: 'text-error-content',
};

export const typographyColorClasses = {
  inherit: 'text-inherit',
  base: 'text-base-100',
  neutral: 'text-neutral',
  primary: 'text-primary',
  secondary: 'text-secondary',
  accent: 'text-accent',
  info: 'text-info',
  success: 'text-success',
  warning: 'text-warning',
  error: 'text-error',
};

export const typographySizeClasses = {
  inherit: '',
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
  '5xl': 'text-5xl',
  '6xl': 'text-6xl',
  '7xl': 'text-7xl',
  '8xl': 'text-8xl',
  '9xl': 'text-9xl',
};

export const typographyWeightClasses = {
  inherit: '',
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

export const typographyDecorationClasses = {
  underline: 'underline',
  'line-through': 'line-through',
  overline: 'overline',
};

export interface TypographyProps<T extends ElementType> {
  as?: T;
  className?: string;
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
  size?: 'inherit' | 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl';
  weight?: 'inherit' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  decoration?: 'underline' | 'line-through' | 'overline';
  content?: boolean;
}

export function Typography<T extends ElementType = 'span'>({
  as,
  className,
  color = 'inherit',
  size = 'inherit',
  weight = 'inherit',
  decoration,
  content = true,
  ...other
}: PropsAs<TypographyProps<T>, T>) {
  const Component = as ?? 'span';

  const combinedClasses = twMerge(
    className,
    color && (content ? typographyContentColorClasses[color] : typographyColorClasses[color]),
    size && typographySizeClasses[size],
    weight && typographyWeightClasses[weight],
    decoration && typographyDecorationClasses[decoration]
  );

  return <Component className={combinedClasses} {...other} />;
}
