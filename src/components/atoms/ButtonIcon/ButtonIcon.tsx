import React, { ElementType, ForwardedRef, ReactNode } from 'react';
import { isSvgIcon, SvgIconType } from '@/models/svg.model';
import { buttonColorClasses, buttonSizeClasses } from '@/components/atoms/Button';
import { forwardRefWithTypes, PropsAs } from '@/utils/typeHelpers';
import { twMerge } from 'tailwind-merge';

export const buttonVariantClasses = {
  square: 'btn-square',
  circle: 'btn-circle',
};

export interface ButtonIconProps<T extends ElementType> {
  as?: T;
  variant?: 'square' | 'circle';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'ghost';
  size?: 'sm' | 'lg';
  icon?: ReactNode | SvgIconType;
  outline?: true;
}

function ButtonIconInner<T extends ElementType = 'button'>(
  { as, color, size, className, icon, variant = 'square', outline, ...other }: PropsAs<ButtonIconProps<T>, T>,
  ref: ForwardedRef<HTMLButtonElement>
) {
  if (isSvgIcon(icon)) {
    icon = React.createElement(icon, { className: 'size-6 shrink-0' });
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
        variant && buttonVariantClasses[variant],
        outline && 'btn-outline',
        className
      )}
      {...other}
    >
      {icon}
    </Component>
  );
}

export const ButtonIcon = forwardRefWithTypes(ButtonIconInner);
