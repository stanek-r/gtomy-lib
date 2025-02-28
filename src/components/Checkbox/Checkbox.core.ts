import { ComponentPropsWithRef, FunctionComponent } from 'react';

export interface CheckboxProps extends ComponentPropsWithRef<'input'> {
  label?: string;
  hint?: string;
  error?: string;
  outlined?: boolean;
  Image?: FunctionComponent<{ className?: string }>;
}
