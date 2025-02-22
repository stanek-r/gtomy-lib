import { ComponentPropsWithRef } from 'react';

export interface CheckboxProps extends ComponentPropsWithRef<'input'> {
  label?: string;
  hint?: string;
  error?: string;
  imagesUrl?: string;
  imageId?: string;
  outlined?: boolean;
}
