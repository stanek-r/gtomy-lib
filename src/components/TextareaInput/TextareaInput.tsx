import { twJoin, twMerge } from 'tailwind-merge';
import { sizeClasses, TextareaInputProps } from '@/components/TextareaInput/TextareaInput.core';
import { Typography } from '@/components/Typography/Typography';

export function TextareaInput({
  className,
  label,
  hint,
  error,
  size = 'md',
  resizable,
  rows,
  ...other
}: TextareaInputProps) {
  const sizeClass = sizeClasses[size];

  return (
    <fieldset className={twMerge('fieldset', className)}>
      {label && <legend className="fieldset-legend">{label}</legend>}
      <textarea
        className={twJoin(
          'textarea w-full',
          error && 'textarea-error',
          resizable ? 'resize-y' : 'resize-none',
          sizeClass
        )}
        placeholder="Write something interesting"
        rows={rows ?? 5}
        {...other}
      ></textarea>
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

TextareaInput.displayName = 'TextareaInput';
