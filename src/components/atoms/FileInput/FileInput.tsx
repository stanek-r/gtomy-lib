import React, { ComponentPropsWithRef, useId } from 'react';
import classNames from 'classnames';

export const fileInputSizeClasses = {
  sm: 'file-input-sm',
  lg: 'file-input-lg',
};

export interface FileInputProps extends Omit<ComponentPropsWithRef<'input'>, 'size'> {
  label?: string;
  hint?: string;
  size?: 'sm' | 'lg';
}

export const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  ({ children, className, label, size, hint, ...other }: FileInputProps, ref) => {
    const id = useId();

    return (
      <div className="form-control">
        {label && (
          <label className="label" htmlFor={id}>
            <span className="label-text">{label}</span>
          </label>
        )}
        <input
          id={id}
          ref={ref}
          type="file"
          className={classNames('file-input file-input-bordered', size && fileInputSizeClasses[size], className)}
          {...other}
        >
          {children}
        </input>
        {hint && (
          <div className="label">
            <span className="label-text-alt">{hint}</span>
          </div>
        )}
      </div>
    );
  }
);

FileInput.displayName = 'FileInput';
