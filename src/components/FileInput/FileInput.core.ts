import { ComponentPropsWithRef } from 'react';

export const fileInputSizeClasses = {
  sm: 'file-input-sm',
  lg: 'file-input-lg',
};

export interface FileInputProps extends Omit<ComponentPropsWithRef<'input'>, 'size'> {
  label?: string;
  hint?: string;
  error?: string;
  size?: 'sm' | 'lg';
}
