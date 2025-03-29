import { twJoin, twMerge } from 'tailwind-merge';
import { sizeClasses, TextInputProps } from '@/components/TextInput/TextInput.core';
import { Typography } from '@/components/Typography/Typography';

export function TextInput({ children, className, label, size = 'md', hint, error, type, ...other }: TextInputProps) {
  const sizeClass = sizeClasses[size];

  return (
    <fieldset className={twMerge('fieldset', className)}>
      {label && <legend className="fieldset-legend">{label}</legend>}
      <input type={type ?? 'text'} className={twJoin('input w-full', error && 'input-error', sizeClass)} {...other}>
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
