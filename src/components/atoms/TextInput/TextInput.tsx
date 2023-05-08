import React, { ComponentPropsWithRef } from 'react';
import classNames from 'classnames';

export type TextInputProps = ComponentPropsWithRef<'input'>;

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ children, className, ...other }: TextInputProps, ref) => {
    return (
      <input ref={ref} type="text" className={classNames('input', className)} {...other}>
        {children}
      </input>
    );
  }
);
TextInput.displayName = 'TextInput';
