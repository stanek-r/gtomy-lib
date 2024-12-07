import { ComponentPropsWithRef, forwardRef, useId } from 'react';
import { twMerge } from 'tailwind-merge';
import { Typography } from '@/components/atoms/Typography';

export interface RadioProps extends ComponentPropsWithRef<'input'> {
  label?: string;
  hint?: string;
  error?: string;
  reversed?: boolean;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, error, hint, className, type, checked, reversed, ...other }: RadioProps, ref) => {
    const id = useId();

    return (
      <div className="form-control">
        <label className="label cursor-pointer">
          {!reversed && <span className="label-text">{label}</span>}
          <input
            id={id}
            ref={ref}
            type={type ?? 'radio'}
            className={twMerge('radio', error && 'radio-error', reversed ? 'mr-3' : 'ml-3', className)}
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
