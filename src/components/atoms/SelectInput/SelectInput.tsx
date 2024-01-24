import React, { ComponentPropsWithRef, useId } from 'react';
import { Typography } from '@/components/atoms/Typography';
import { twMerge } from 'tailwind-merge';

export interface Option {
  value: string;
  label: string;
}

export interface SelectInputProps extends Omit<ComponentPropsWithRef<'select'>, 'children'> {
  label?: string;
  hint?: string;
  options: Option[];
  allowEmpty?: boolean;
  error?: string;
}

export const SelectInput = React.forwardRef<HTMLSelectElement, SelectInputProps>(
  ({ className, label, hint, options, allowEmpty, error, ...other }: SelectInputProps, ref) => {
    const id = useId();

    return (
      <div className="form-control">
        {label && (
          <label className="label" htmlFor={id}>
            <span className="label-text">{label}</span>
          </label>
        )}
        <select id={id} ref={ref} className={twMerge('select select-bordered', className)} {...other}>
          {allowEmpty && <option value="">Not selected</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
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

SelectInput.displayName = 'SelectInput';
