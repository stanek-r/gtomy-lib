import React, { ComponentPropsWithRef, useId } from 'react';
import classNames from 'classnames';

export interface TextInputProps extends ComponentPropsWithRef<'input'> {
  label?: string;
  hint?: string;
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ children, className, label, hint, ...other }: TextInputProps, ref) => {
    const id = useId();

    return (
      <div className="form-control">
        {label && (
          <label className="label" htmlFor={id}>
            <span className="label-text">{label}</span>
          </label>
        )}
        <input id={id} ref={ref} type="text" className={classNames('input input-bordered', className)} {...other}>
          {children}
        </input>
        {hint && (
          <div className="label">
            <span className="label-text-alt">{hint}</span>
          </div>
        )}
      </div>
    );
  }
);
TextInput.displayName = 'TextInput';
