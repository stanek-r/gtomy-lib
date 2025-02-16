import { forwardRef, useId } from 'react';
import { twJoin, twMerge } from 'tailwind-merge';
import { FileInputProps, fileInputSizeClasses } from '@/components/FileInput/FileInput.core';
import { Typography } from '@/components/Typography/Typography';

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  ({ children, className, label, size, hint, error, ...other }: FileInputProps, ref) => {
    const id = useId();

    return (
      <div className={twMerge('form-control', className)}>
        {label && (
          <label className="label" htmlFor={id}>
            <span className="label-text">{label}</span>
          </label>
        )}
        <input
          id={id}
          ref={ref}
          type="file"
          className={twJoin('file-input file-input-bordered', size && fileInputSizeClasses[size])}
          {...other}
        >
          {children}
        </input>
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

FileInput.displayName = 'FileInput';
