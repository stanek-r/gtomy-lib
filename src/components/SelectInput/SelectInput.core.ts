import { ComponentPropsWithRef } from 'react';

export const sizeClasses = {
  lg: 'select-lg',
  md: '',
  sm: 'select-sm',
  xs: 'select-xs',
};

export interface Option {
  value: string;
  label: string;
}

export interface SelectInputProps extends Omit<Omit<ComponentPropsWithRef<'select'>, 'children'>, 'size'> {
  label?: string;
  hint?: string;
  options: Option[];
  allowEmpty?: boolean;
  error?: string;
  size?: 'lg' | 'md' | 'sm' | 'xs';
}
