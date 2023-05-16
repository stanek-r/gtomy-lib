import React, { ComponentPropsWithRef, useId } from 'react';
import classNames from 'classnames';

export interface TextareaInputProps extends ComponentPropsWithRef<'textarea'> {
  label?: string;
  hint?: string;
  resizable?: boolean;
}

export const TextareaInput = React.forwardRef<HTMLTextAreaElement, TextareaInputProps>(
  ({ className, label, hint, resizable, rows, ...other }: TextareaInputProps, ref) => {
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
          className={classNames('textarea textarea-bordered', resizable ? 'resize-y' : 'resize-none', className)}
          placeholder="Write something interesting"
          rows={rows ?? 5}
          {...other}
        ></textarea>
        {hint && (
          <div className="label">
            <span className="label-text-alt">{hint}</span>
          </div>
        )}
      </div>
    );
  }
);

TextareaInput.displayName = 'TextareaInput';
