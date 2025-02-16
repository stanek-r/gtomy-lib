import { forwardRef, useId } from 'react';
import { twJoin, twMerge } from 'tailwind-merge';
import { ToggleProps, toggleSizeClasses } from '@/components/Toggle/Toggle.core';
import { Typography } from '@/components/Typography/Typography';

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  ({ label, error, hint, className, type, checked, size, ...other }: ToggleProps, ref) => {
    const id = useId();

    return (
      <div className={twMerge('form-control', className)}>
        <label className="label cursor-pointer flex-col">
          <div className="flex w-full justify-between">
            <span className="label-text">{label}</span>
            <input
              id={id}
              ref={ref}
              type={type ?? 'checkbox'}
              className={twJoin('toggle', error && 'toggle-error', size && toggleSizeClasses[size])}
              checked={checked}
              {...other}
            />
          </div>
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

Toggle.displayName = 'Toggle';
