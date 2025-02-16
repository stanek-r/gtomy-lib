import { ComponentPropsWithRef } from 'react';

export interface RadioProps extends ComponentPropsWithRef<'input'> {
  label?: string;
  hint?: string;
  error?: string;
  reversed?: boolean;
}
