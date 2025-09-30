import { ComponentPropsWithRef } from 'react';

export const textInputSizeClasses = {
  lg: 'input-lg',
  md: '',
  sm: 'input-sm',
  xs: 'input-xs',
};

export interface TextInputProps extends Omit<ComponentPropsWithRef<'input'>, 'size'> {
  label?: string;
  hint?: string;
  error?: string;
  size?: 'lg' | 'md' | 'sm' | 'xs';
}
