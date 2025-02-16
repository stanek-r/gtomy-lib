import { ComponentPropsWithRef } from 'react';

export interface TextareaInputProps extends ComponentPropsWithRef<'textarea'> {
  label?: string;
  hint?: string;
  error?: string;
  resizable?: boolean;
}
