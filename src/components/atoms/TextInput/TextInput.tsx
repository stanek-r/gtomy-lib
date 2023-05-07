import React, { ComponentPropsWithRef } from 'react';
import classNames from 'classnames';

export type TextInputProps = ComponentPropsWithRef<'input'>;

export function TextInput({ children, className, ...other }: TextInputProps) {
  return (
    <input type="text" className={classNames('input', className)} {...other}>
      {children}
    </input>
  );
}
