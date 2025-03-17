import { twJoin, twMerge } from 'tailwind-merge';
import { FileInputProps, fileInputSizeClasses } from '@/components/FileInput/FileInput.core';
import { Typography } from '@/components/Typography/Typography';

export function FileInput({ children, className, label, size, hint, error, ...other }: FileInputProps) {
  return (
    <fieldset className={twMerge('fieldset', className)}>
      {label && <label className="fieldset-legend">{label}</label>}
      <input type="file" className={twJoin('file-input', size && fileInputSizeClasses[size])} {...other}>
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
