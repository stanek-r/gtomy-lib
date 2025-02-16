import { forwardRef, useId } from 'react';
import { twJoin, twMerge } from 'tailwind-merge';
import { RadioProps } from '@/components/Radio/Radio.core';
import { Typography } from '@/components/Typography/Typography';

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, error, hint, className, type, checked, reversed, ...other }: RadioProps, ref) => {
    const id = useId();

    return (
      <div className={twMerge('form-control', className)}>
        <label className="label cursor-pointer">
          {!reversed && <span className="label-text">{label}</span>}
          <input
            id={id}
            ref={ref}
            type={type ?? 'radio'}
            className={twJoin('radio', error && 'radio-error', reversed ? 'mr-3' : 'ml-3')}
            checked={checked}
            {...other}
          />
          {reversed && <span className="label-text">{label}</span>}
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

Radio.displayName = 'Radio';
