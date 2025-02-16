import { forwardRef, useId } from 'react';
import { twJoin, twMerge } from 'tailwind-merge';
import { sizeClasses, TextareaInputProps } from '@/components/TextareaInput/TextareaInput.core';
import { Typography } from '@/components/Typography/Typography';

export const TextareaInput = forwardRef<HTMLTextAreaElement, TextareaInputProps>(
  ({ className, label, hint, error, size = 'md', resizable, rows, ...other }: TextareaInputProps, ref) => {
    const id = useId();
    const sizeClass = sizeClasses[size];

    return (
      <div className={twMerge('form-control', className)}>
        {label && (
          <label className="label" htmlFor={id}>
            <span className="label-text">{label}</span>
          </label>
        )}
        <textarea
          ref={ref}
          className={twJoin(
            'textarea textarea-bordered',
            error && 'textarea-error',
            resizable ? 'resize-y' : 'resize-none',
            sizeClass
          )}
          placeholder="Write something interesting"
          rows={rows ?? 5}
          {...other}
        ></textarea>
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

TextareaInput.displayName = 'TextareaInput';
