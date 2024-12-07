import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export interface RadioGroupProps {
  horizontal?: boolean;
  children?: ReactNode;
  className?: string;
  label?: string;
}

export function RadioGroup({ children, horizontal, className, label }: RadioGroupProps) {
  return (
    <div className={twMerge('"flex flex-col gap-2"', className)}>
      {label && (
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
      )}
      <div className={twMerge('flex', horizontal ? 'flex-row gap-3' : 'flex-col')}>{children}</div>
    </div>
  );
}
