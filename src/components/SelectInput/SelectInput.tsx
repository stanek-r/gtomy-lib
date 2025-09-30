import { twJoin, twMerge } from 'tailwind-merge';
import { SelectInputProps, selectInputSizeClasses } from '@/components/SelectInput/SelectInput.core';
import { Typography } from '@/components/Typography/Typography';

export function SelectInput({
  className,
  label,
  hint,
  options,
  allowEmpty,
  error,
  size = 'md',
  ...other
}: SelectInputProps) {
  const sizeClass = selectInputSizeClasses[size];

  return (
    <fieldset className={twMerge('fieldset', className)}>
      {label && <legend className="fieldset-legend">{label}</legend>}
      <select className={twJoin('select w-full', sizeClass)} {...other}>
        {allowEmpty && <option value="">Not selected</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
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
