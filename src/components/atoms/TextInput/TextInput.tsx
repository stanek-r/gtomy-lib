import { ComponentPropsWithRef, forwardRef, useId } from 'react';
import { twMerge } from 'tailwind-merge';
import { Typography } from '@/components/atoms/Typography/Typography';

export interface TextInputProps extends ComponentPropsWithRef<'input'> {
  label?: string;
  hint?: string;
  error?: string;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
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
