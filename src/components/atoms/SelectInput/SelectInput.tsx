import React, { ComponentPropsWithRef, useId } from 'react';
import { Typography } from '@/components/atoms/Typography';
import { twMerge } from 'tailwind-merge';

const sizeClasses = {
  lg: 'select-lg',
  md: '',
  sm: 'select-sm',
  xs: 'select-xs',
};

export interface Option {
  value: string;
  label: string;
}

export interface SelectInputProps extends Omit<Omit<ComponentPropsWithRef<'select'>, 'children'>, 'size'> {
  label?: string;
  hint?: string;
  options: Option[];
  allowEmpty?: boolean;
  error?: string;
  size?: 'lg' | 'md' | 'sm' | 'xs';
}

export const SelectInput = React.forwardRef<HTMLSelectElement, SelectInputProps>(
  ({ className, label, hint, options, allowEmpty, error, size = 'md', ...other }: SelectInputProps, ref) => {
    const id = useId();
    const sizeClass = sizeClasses[size];

    return (
      <div className="form-control">
        {label && (
          <label className="label" htmlFor={id}>
            <span className="label-text">{label}</span>
          </label>
        )}
        <select id={id} ref={ref} className={twMerge('select select-bordered', sizeClass, className)} {...other}>
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
