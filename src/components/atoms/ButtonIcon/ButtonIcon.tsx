import React, { ElementType, ForwardedRef, ReactNode } from 'react';
import classNames from 'classnames';
import { isSvgIcon, SvgIconType } from '@/models/svg.model';
import { buttonSizeClasses, buttonColorClasses } from '@/components/atoms/Button';
import { forwardRefWithTypes, PropsAs } from '@/utils/typeHelpers';

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
}

function ButtonIconInner<T extends ElementType = 'button'>(
  { as, color, size, className, icon, variant = 'square', ...other }: PropsAs<ButtonIconProps<T>, T>,
  ref: ForwardedRef<HTMLButtonElement>
) {
  if (isSvgIcon(icon)) {
    icon = React.createElement(icon, { className: 'w-6 h-6' });
  }

  const Component = as ?? 'button';
  const type = Component === 'button' ? 'button' : undefined;
  return (
    <Component
      ref={ref}
      type={type}
      className={classNames(
        'btn ',
        color && buttonColorClasses[color],
        size && buttonSizeClasses[size],
        variant && buttonVariantClasses[variant],
        className
      )}
      {...other}
    >
      {icon}
    </Component>
  );
}

export const ButtonIcon = forwardRefWithTypes(ButtonIconInner);
