import { twJoin, twMerge } from 'tailwind-merge';
import { ToggleProps, toggleSizeClasses } from '@/components/Toggle/Toggle.core';
import { Typography } from '@/components/Typography/Typography';

export function Toggle({ label, error, hint, className, type, checked, size, ...other }: ToggleProps) {
  return (
    <fieldset className={twMerge('fieldset', className)}>
      <label className="fieldset-label cursor-pointer flex-col">
        <div className="flex w-full justify-between">
          {label}
          <input
            type={type ?? 'checkbox'}
            className={twJoin('toggle', error && 'toggle-error', size && toggleSizeClasses[size])}
            checked={checked}
            {...other}
          />
        </div>
      </label>
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
