import React, { ElementType } from 'react';
import { PropsAs } from '@/utils';
import { twMerge } from 'tailwind-merge';

export const typographyColorClasses = {
  inherit: 'text-inherit',
  white: 'text-base-content',
  lightgray: 'text-base-100',
  gray: 'text-base-300',
  red: 'text-error',
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
  color?: 'inherit' | 'white' | 'gray' | 'lightgray' | 'red';
  size?: 'inherit' | 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl';
  weight?: 'inherit' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  decoration?: 'underline' | 'line-through' | 'overline';
}

export function Typography<T extends ElementType = 'span'>({
  as,
  className,
  color = 'inherit',
  size = 'inherit',
  weight = 'inherit',
  decoration,
  ...other
}: PropsAs<TypographyProps<T>, T>) {
  const Component = as ?? 'span';

  const combinedClasses = twMerge(
    className,
    color && typographyColorClasses[color],
    size && typographySizeClasses[size],
    weight && typographyWeightClasses[weight],
    decoration && typographyDecorationClasses[decoration]
  );

  return <Component className={combinedClasses} {...other} />;
}
