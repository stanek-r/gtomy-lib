import React, { ComponentPropsWithRef, ReactNode } from 'react';
import classNames from 'classnames';
import { isSvgIcon, SvgIconType } from '../../../models/svg.model';
import { buttonSizeClasses, buttonColorClasses } from '../Button';

export const buttonVariantClasses = {
  square: 'btn-square',
  circle: 'btn-circle',
};

export interface ButtonIconProps extends Omit<ComponentPropsWithRef<'button'>, 'children'> {
  variant?: 'square' | 'circle';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'ghost';
  size?: 'sm' | 'lg';
  icon?: ReactNode | SvgIconType;
}

export const ButtonIcon = React.forwardRef<HTMLButtonElement, ButtonIconProps>(
  ({ type, color, size, className, icon, variant = 'square', ...other }: ButtonIconProps, ref) => {
    if (isSvgIcon(icon)) {
      icon = React.createElement(icon, { className: 'w-6 h-6' });
    }
    return (
      <button
        ref={ref}
        type={type ? type : 'button'}
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
      </button>
    );
  }
);

ButtonIcon.displayName = 'ButtonIcon';
