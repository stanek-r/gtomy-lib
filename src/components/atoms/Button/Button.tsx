import { ElementType, ForwardedRef } from 'react';
import { forwardRefWithTypes, PropsAs } from '@/utils/typeHelpers';
import { twMerge } from 'tailwind-merge';
import { Icon, IconType } from '@/components/atoms/Icon';

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
}

export function ButtonInner<T extends ElementType = 'button'>(
  {
    as,
    children,
    color,
    size,
    className,
    startIcon,
    endIcon,
    outline,
    wide,
    glass,
    ...other
  }: PropsAs<ButtonProps<T>, T>,
  ref: ForwardedRef<HTMLButtonElement>
) {
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
        wide && 'btn-wide',
        glass && 'glass',
        className
      )}
      {...other}
    >
      <Icon icon={startIcon} className="mr-1.5" />
      {children}
      <Icon icon={endIcon} className="ml-1.5" />
    </Component>
  );
}

export const Button = forwardRefWithTypes(ButtonInner);
