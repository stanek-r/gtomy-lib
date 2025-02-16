import { forwardRef, useId } from 'react';
import { twJoin, twMerge } from 'tailwind-merge';
import { TextInputProps } from '@/components/TextInput/TextInput.core';
import { Typography } from '@/components/Typography/Typography';

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ children, className, label, hint, error, type, ...other }: TextInputProps, ref) => {
    const id = useId();

    return (
      <div className={twMerge('form-control', className)}>
        {label && (
          <label className="label" htmlFor={id}>
            <span className="label-text">{label}</span>
          </label>
        )}
        <input
          id={id}
          ref={ref}
          type={type ?? 'text'}
          className={twJoin('input input-bordered', error && 'input-error')}
          {...other}
        >
          {children}
        </input>
        {error && (
          <div className="label">
            <Typography color="error" content={false} className="label-text-alt">
              {error}
            </Typography>
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
