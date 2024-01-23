import React, { ComponentPropsWithRef, useId } from 'react';
import { Text } from '@/components/atoms/Typography';
import { twMerge } from 'tailwind-merge';

export interface TextareaInputProps extends ComponentPropsWithRef<'textarea'> {
  label?: string;
  hint?: string;
  error?: string;
  resizable?: boolean;
}

export const TextareaInput = React.forwardRef<HTMLTextAreaElement, TextareaInputProps>(
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
            <Text color="red" className="label-text-alt">
              {error}
            </Text>
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
