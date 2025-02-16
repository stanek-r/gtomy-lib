import { forwardRef, useId } from 'react';
import { twJoin, twMerge } from 'tailwind-merge';
import { SelectInputProps, sizeClasses } from '@/components/SelectInput/SelectInput.core';
import { Typography } from '@/components/Typography/Typography';

export const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(
  ({ className, label, hint, options, allowEmpty, error, size = 'md', ...other }: SelectInputProps, ref) => {
    const id = useId();
    const sizeClass = sizeClasses[size];

    return (
      <div className={twMerge('form-control', className)}>
        {label && (
          <label className="label" htmlFor={id}>
            <span className="label-text">{label}</span>
          </label>
        )}
        <select id={id} ref={ref} className={twJoin('select select-bordered', sizeClass)} {...other}>
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
