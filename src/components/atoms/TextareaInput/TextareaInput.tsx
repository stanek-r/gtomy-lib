import { ComponentPropsWithRef, forwardRef, useId } from 'react';
import { twMerge } from 'tailwind-merge';
import { Typography } from '@/components/atoms/Typography/Typography';

export interface TextareaInputProps extends ComponentPropsWithRef<'textarea'> {
  label?: string;
  hint?: string;
  error?: string;
  resizable?: boolean;
}

export const TextareaInput = forwardRef<HTMLTextAreaElement, TextareaInputProps>(
  ({ className, label, hint, error, resizable, rows, ...other }: TextareaInputProps, ref) => {
    const id = useId();

    return (
      <div className="form-control">
        {label && (
          <label className="label" htmlFor={id}>
            <span className="label-text">{label}</span>
          </label>
        )}
        <textarea
          ref={ref}
          className={twMerge(
            'textarea textarea-bordered',
            error && 'textarea-error',
            resizable ? 'resize-y' : 'resize-none',
            className
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
