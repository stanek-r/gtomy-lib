import React, { ComponentPropsWithRef } from 'react';
import classNames from 'classnames';

export type ButtonBaseProps = ComponentPropsWithRef<'button'>;

export function ButtonBase({ children, type, className, ...other }: ButtonBaseProps) {
  return (
    <button type={type ? type : 'button'} className={classNames('btn', className)} {...other}>
      {children}
    </button>
  );
}
