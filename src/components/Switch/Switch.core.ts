import { ComponentPropsWithRef, ReactNode } from 'react';

export interface SwitchProps extends Omit<ComponentPropsWithRef<'input'>, 'size'> {
  startElement?: ReactNode;
  endElement?: ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg';
}
