import React, { ComponentPropsWithRef, useId } from 'react';
import { twMerge } from 'tailwind-merge';
import { Typography } from '@/components/atoms/Typography';

export interface CheckboxProps extends ComponentPropsWithRef<'input'> {
  label?: string;
  hint?: string;
  error?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, hint, className, children, type, ...other }: CheckboxProps, ref) => {
    const id = useId();

    return (
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">{label}</span>
          <input
            id={id}
            ref={ref}
            type={type ?? 'checkbox'}
            className={twMerge('checkbox', error && 'checkbox-error', className)}
            {...other}
          />
        </label>
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

Checkbox.displayName = 'Checkbox';
