import { ComponentPropsWithRef, forwardRef, useId } from 'react';
import { twMerge } from 'tailwind-merge';
import { Typography } from '@/components/atoms/Typography/Typography';

export const toggleSizeClasses = {
  xs: 'toggle-xs',
  sm: 'toggle-sm',
  md: 'toggle-md',
  lg: 'toggle-lg',
};

export interface ToggleProps extends Omit<ComponentPropsWithRef<'input'>, 'size'> {
  label?: string;
  hint?: string;
  error?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  ({ label, error, hint, className, type, checked, size, ...other }: ToggleProps, ref) => {
    const id = useId();

    return (
      <div className="form-control">
        <label className="label cursor-pointer flex-col">
          <div className="flex w-full justify-between">
            <span className="label-text">{label}</span>
            <input
              id={id}
              ref={ref}
              type={type ?? 'checkbox'}
              className={twMerge('toggle', error && 'toggle-error', size && toggleSizeClasses[size], className)}
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
