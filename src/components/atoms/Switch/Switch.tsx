import React, { ComponentPropsWithRef, ReactNode, useId } from 'react';
import { twMerge } from 'tailwind-merge';
import { toggleSizeClasses } from '@/components/atoms/Toggle/Toggle';

export interface SwitchProps extends Omit<ComponentPropsWithRef<'input'>, 'size'> {
  startElement?: ReactNode;
  endElement?: ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ startElement, endElement, className, type, checked, size, ...other }: SwitchProps, ref) => {
    const id = useId();

    return (
      <div className="flex items-center gap-3">
        <span>{startElement}</span>
        <input
          id={id}
          ref={ref}
          type={type ?? 'checkbox'}
          className={twMerge('toggle', size && toggleSizeClasses[size], className)}
          checked={checked}
          {...other}
        />
        <span>{endElement}</span>
      </div>
    );
  }
);

Switch.displayName = 'Switch';
