import { ComponentPropsWithRef, forwardRef, useId, useMemo } from 'react';
import { twMerge } from 'tailwind-merge';
import { Typography } from '@/components/atoms/Typography';
import { CloudflareImage } from '@/components/atoms/CloudflareImage';

export interface CheckboxProps extends ComponentPropsWithRef<'input'> {
  label?: string;
  hint?: string;
  error?: string;
  imageId?: string;
  outlined?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, hint, className, type, imageId, checked, outlined, ...other }: CheckboxProps, ref) => {
    const id = useId();
    const displayOutline = useMemo(() => outlined && checked, [outlined, checked]);

    return (
      <div
        className={twMerge(
          'form-control',
          displayOutline && 'outline outline-1 outline-offset-4 outline-base-content rounded',
          imageId && 'w-52'
        )}
      >
        <label className="label cursor-pointer flex-col">
          {imageId && (
            <div className="mb-3 px-1">
              <CloudflareImage imageId={imageId} className="size-[12.5rem] object-cover shadow-lg" />
            </div>
          )}
          <div className="flex w-full justify-between">
            <span className="label-text">{label}</span>
            <input
              id={id}
              ref={ref}
              type={type ?? 'checkbox'}
              className={twMerge('checkbox', error && 'checkbox-error', className)}
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

Checkbox.displayName = 'Checkbox';
