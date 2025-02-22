import { forwardRef, useId } from 'react';
import { twJoin, twMerge } from 'tailwind-merge';
import { CheckboxProps } from '@/components/Checkbox/Checkbox.core';
import { Typography } from '@/components/Typography/Typography';
import { CloudflareImage } from '@/components/CloudflareImage/CloudflareImage';

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, hint, className, type, imageId, checked, outlined, imagesUrl, ...other }: CheckboxProps, ref) => {
    const id = useId();

    const classes = twMerge(
      'fieldset',
      outlined && checked && 'outline outline-1 outline-offset-4 outline-base-content rounded',
      imageId && 'w-52',
      className
    );

    return (
      <fieldset className={classes}>
        <label className="fieldset-label cursor-pointer flex-col">
          {imageId && imagesUrl && (
            <div className="mb-3 px-1">
              <CloudflareImage
                imagesUrl={imagesUrl}
                imageId={imageId}
                className="size-[12.5rem] object-cover shadow-lg"
              />
            </div>
          )}
          <div className="flex w-full justify-between">
            <span className="label-text">{label}</span>
            <input
              id={id}
              ref={ref}
              type={type ?? 'checkbox'}
              className={twJoin('checkbox', error && 'checkbox-error')}
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
);

Checkbox.displayName = 'Checkbox';
