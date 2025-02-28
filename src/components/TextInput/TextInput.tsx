import { forwardRef } from 'react';
import { twJoin, twMerge } from 'tailwind-merge';
import { sizeClasses, TextInputProps } from '@/components/TextInput/TextInput.core';
import { Typography } from '@/components/Typography/Typography';

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ children, className, label, size = 'md', hint, error, type, ...other }: TextInputProps, ref) => {
    const sizeClass = sizeClasses[size];

    return (
      <fieldset className={twMerge('fieldset', className)}>
        {label && <legend className="fieldset-legend">{label}</legend>}
        <input
          ref={ref}
          type={type ?? 'text'}
          className={twJoin('input', error && 'input-error', sizeClass)}
          {...other}
        >
          {children}
        </input>
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

TextInput.displayName = 'TextInput';
