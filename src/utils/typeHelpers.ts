import { ComponentPropsWithoutRef, ElementType } from 'react';

export type PropsAs<Props, T extends ElementType> = Props & Omit<ComponentPropsWithoutRef<T>, keyof Props>;

export const ControlledFormTransformer = {
  from: (value: string): string | null => {
    if (value == null || value.trim() === '') {
      return null;
    }
    return value;
  },
  to: (value: number | string | null | undefined): string => {
    if (value == null) {
      return '';
    }
    return value.toString();
  },
};
