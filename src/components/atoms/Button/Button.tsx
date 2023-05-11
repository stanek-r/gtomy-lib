import React, { ComponentPropsWithRef, ReactNode } from 'react';
import classNames from 'classnames';
import { isSvgIcon, SvgIconType } from '../../../models/svg.model';

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

export interface ButtonProps extends ComponentPropsWithRef<'button'> {
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'ghost';
  size?: 'sm' | 'lg';
  wide?: boolean;
  startIcon?: ReactNode | SvgIconType;
  endIcon?: ReactNode | SvgIconType;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, type, color, size, className, startIcon, endIcon, ...other }: ButtonProps, ref) => {
    if (isSvgIcon(startIcon)) {
      startIcon = React.createElement(startIcon, { className: 'w-5 h-5 mr-1.5' });
    }
    if (isSvgIcon(endIcon)) {
      endIcon = React.createElement(endIcon, { className: 'w-5 h-5 ml-1.5' });
    }

    return (
      <button
        ref={ref}
        type={type ? type : 'button'}
        className={classNames('btn', color && buttonColorClasses[color], size && buttonSizeClasses[size], className)}
        {...other}
      >
        {startIcon}
        {children}
        {endIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';
