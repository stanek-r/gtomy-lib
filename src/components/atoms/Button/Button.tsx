import React, { ElementType, ForwardedRef, ReactNode } from 'react';
import { isSvgIcon, SvgIconType } from '@/models/svg.model';
import { forwardRefWithTypes, PropsAs } from '@/utils/typeHelpers';
import { twMerge } from 'tailwind-merge';

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
  startIcon?: ReactNode | SvgIconType;
  endIcon?: ReactNode | SvgIconType;
  outline?: true;
}

export function ButtonInner<T extends ElementType = 'button'>(
  { as, children, color, size, className, startIcon, endIcon, outline, ...other }: PropsAs<ButtonProps<T>, T>,
  ref: ForwardedRef<HTMLButtonElement>
) {
  if (isSvgIcon(startIcon)) {
    startIcon = React.createElement(startIcon, { className: 'w-5 h-5 mr-1.5' });
  }
  if (isSvgIcon(endIcon)) {
    endIcon = React.createElement(endIcon, { className: 'w-5 h-5 ml-1.5' });
  }

  const Component = as ?? 'button';
  const type = Component === 'button' ? 'button' : undefined;
  return (
    <Component
      ref={ref}
      type={type}
      className={twMerge(
        'btn',
        color && buttonColorClasses[color],
        size && buttonSizeClasses[size],
        outline && 'btn-outline',
        className
      )}
      {...other}
    >
      {startIcon}
      {children}
      {endIcon}
    </Component>
  );
}

export const Button = forwardRefWithTypes(ButtonInner);
