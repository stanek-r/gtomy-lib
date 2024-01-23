import React, { ComponentPropsWithRef, useId } from 'react';
import { Text } from '@/components/atoms/Typography/Text';
import { twMerge } from 'tailwind-merge';

export interface TextInputProps extends ComponentPropsWithRef<'input'> {
  label?: string;
  hint?: string;
  error?: string;
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ children, className, label, hint, error, type, ...other }: TextInputProps, ref) => {
    const id = useId();

    return (
      <div className="form-control">
        {label && (
          <label className="label" htmlFor={id}>
            <span className="label-text">{label}</span>
          </label>
        )}
        <input
          id={id}
          ref={ref}
          type={type ?? 'text'}
          className={twMerge('input input-bordered', error && 'input-error', className)}
          {...other}
        >
          {children}
        </input>
        {error && (
          <div className="label">
            <Text color="red" className="label-text-alt">
              {error}
            </Text>
          </div>
        )}
        {hint && !error && (
          <div className="label">
            <span className="label-text-alt">{hint}</span>
          </div>
        )}
      </div>
    );
  }
);

TextInput.displayName = 'TextInput';
