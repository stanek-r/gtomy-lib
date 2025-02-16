import { ComponentPropsWithRef } from 'react';

export interface TextInputProps extends ComponentPropsWithRef<'input'> {
  label?: string;
  hint?: string;
  error?: string;
}
