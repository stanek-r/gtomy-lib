import { forwardRef, useId } from 'react';
import { twJoin, twMerge } from 'tailwind-merge';
import { SwitchProps } from '@/components/Switch/Switch.core';
import { toggleSizeClasses } from '@/components/Toggle/Toggle.core';

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ startElement, endElement, className, type, checked, size, ...other }: SwitchProps, ref) => {
    const id = useId();

    return (
      <div className={twMerge('flex items-center gap-3', className)}>
        <span>{startElement}</span>
        <input
          id={id}
          ref={ref}
          type={type ?? 'checkbox'}
          className={twJoin('toggle', size && toggleSizeClasses[size])}
          checked={checked}
          {...other}
        />
        <span>{endElement}</span>
      </div>
    );
  }
);

Switch.displayName = 'Switch';
