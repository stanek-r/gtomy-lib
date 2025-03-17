import { useId } from 'react';
import { twJoin, twMerge } from 'tailwind-merge';
import { SwitchProps } from '@/components/Switch/Switch.core';
import { toggleSizeClasses } from '@/components/Toggle/Toggle.core';

export function Switch({ startElement, endElement, className, type, checked, size, ...other }: SwitchProps) {
  const id = useId();

  return (
    <div className={twMerge('flex items-center gap-3', className)}>
      <span>{startElement}</span>
      <input
        id={id}
        type={type ?? 'checkbox'}
        className={twJoin('toggle', size && toggleSizeClasses[size])}
        checked={checked}
        {...other}
      />
      <span>{endElement}</span>
    </div>
  );
}
