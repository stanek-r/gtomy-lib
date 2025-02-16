import { ComponentPropsWithRef } from 'react';

export const toggleSizeClasses = {
  xs: 'toggle-xs',
  sm: 'toggle-sm',
  md: 'toggle-md',
  lg: 'toggle-lg',
};

export interface ToggleProps extends Omit<ComponentPropsWithRef<'input'>, 'size'> {
  label?: string;
  hint?: string;
  error?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
}
