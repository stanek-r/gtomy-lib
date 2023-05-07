import React, { ComponentPropsWithRef } from 'react';
import classNames from 'classnames';

export type ButtonProps = ComponentPropsWithRef<'button'>;

export function Button({ children, type, className, ...other }: ButtonProps) {
  return (
    <button type={type ? type : 'button'} className={classNames('btn', className)} {...other}>
      {children}
    </button>
  );
}
