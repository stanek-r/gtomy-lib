import { forwardRef } from 'react';
import { twJoin, twMerge } from 'tailwind-merge';
import { RadioProps } from '@/components/Radio/Radio.core';
import { Typography } from '@/components/Typography/Typography';

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, error, hint, className, type, checked, reversed, ...other }: RadioProps, ref) => {
    return (
      <fieldset className={twMerge('fieldset', className)}>
        <label className="fieldset-label cursor-pointer">
          {!reversed && label}
          <input
            ref={ref}
            type={type ?? 'radio'}
            className={twJoin('radio', error && 'radio-error', reversed ? 'mr-3' : 'ml-3')}
            checked={checked}
            {...other}
          />
          {reversed && label}
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
);

Radio.displayName = 'Radio';
