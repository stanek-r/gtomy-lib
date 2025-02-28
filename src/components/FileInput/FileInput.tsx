import { forwardRef } from 'react';
import { twJoin, twMerge } from 'tailwind-merge';
import { FileInputProps, fileInputSizeClasses } from '@/components/FileInput/FileInput.core';
import { Typography } from '@/components/Typography/Typography';

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  ({ children, className, label, size, hint, error, ...other }: FileInputProps, ref) => {
    return (
      <fieldset className={twMerge('fieldset', className)}>
        {label && <label className="fieldset-legend">{label}</label>}
        <input ref={ref} type="file" className={twJoin('file-input', size && fileInputSizeClasses[size])} {...other}>
          {children}
        </input>
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

FileInput.displayName = 'FileInput';
