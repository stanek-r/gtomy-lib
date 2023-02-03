import React, { ComponentPropsWithRef } from 'react';
import classNames from 'classnames';

type Props = ComponentPropsWithRef<'button'>;

export function ButtonBase({ children, type, className, ...other }: Props) {
  return (
    <button type={type ? type : 'button'} className={classNames('btn', className)} {...other}>
      {children}
    </button>
  );
}
