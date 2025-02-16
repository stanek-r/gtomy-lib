import { ComponentPropsWithRef } from 'react';

export const sizeClasses = {
  lg: 'textarea-lg',
  md: '',
  sm: 'textarea-sm',
  xs: 'textarea-xs',
};

export interface TextareaInputProps extends ComponentPropsWithRef<'textarea'> {
  label?: string;
  hint?: string;
  error?: string;
  resizable?: boolean;
  size?: 'lg' | 'md' | 'sm' | 'xs';
}
