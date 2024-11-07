import { ComponentPropsWithoutRef, ElementType, ForwardedRef, forwardRef, ReactElement, RefAttributes } from 'react';

export type PropsAs<Props, T extends ElementType> = Props & Omit<ComponentPropsWithoutRef<T>, keyof Props>;

export function forwardRefWithTypes<T, P = Record<string, unknown>>(
  render: (props: P, ref: ForwardedRef<T>) => ReactElement | null
): (props: P & RefAttributes<T>) => ReactElement | null {
  return forwardRef(render as any) as any;
}

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
