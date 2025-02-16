import { twJoin, twMerge } from 'tailwind-merge';
import { RadioGroupProps } from '@/components/Radio/RadioGroup.core';

export function RadioGroup({ children, horizontal, className, label }: RadioGroupProps) {
  return (
    <div className={twMerge('"flex flex-col gap-2"', className)}>
      {label && (
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
      )}
      <div className={twJoin('flex', horizontal ? 'flex-row gap-3' : 'flex-col')}>{children}</div>
    </div>
  );
}
