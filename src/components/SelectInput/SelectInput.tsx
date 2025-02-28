import { forwardRef } from 'react';
import { twJoin, twMerge } from 'tailwind-merge';
import { SelectInputProps, sizeClasses } from '@/components/SelectInput/SelectInput.core';
import { Typography } from '@/components/Typography/Typography';

export const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(
  ({ className, label, hint, options, allowEmpty, error, size = 'md', ...other }: SelectInputProps, ref) => {
    const sizeClass = sizeClasses[size];

    return (
      <fieldset className={twMerge('fieldset', className)}>
        {label && <legend className="fieldset-legend">{label}</legend>}
        <select ref={ref} className={twJoin('select', sizeClass)} {...other}>
          {allowEmpty && <option value="">Not selected</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <div className="fieldset-label">
            <Typography color="error" content={false}>
              {error}
            </Typography>
          </div>
        )}
        {hint && !error && <div className="fieldset-label">{hint}</div>}
      </fieldset>
    );
  }
);

SelectInput.displayName = 'SelectInput';
