import {
  ComponentPropsWithoutRef,
  ElementType,
  forwardRef,
  MutableRefObject,
  ReactElement,
  Ref,
  RefAttributes,
} from 'react';

export type PropsAs<Props, T extends ElementType> = Props & Omit<ComponentPropsWithoutRef<T>, keyof Props>;

export function forwardRefWithTypes<T, P = Record<string, unknown>>(
  render: (props: P, ref: Ref<T>) => ReactElement | null
): (props: P & RefAttributes<T>) => ReactElement | null {
  return forwardRef(render) as any;
}

export function assignRefs<T>(...refs: Ref<T | null>[]) {
  return (node: T | null) => {
    refs.forEach((r) => {
      if (typeof r === 'function') {
        r(node);
      } else if (r) {
        (r as MutableRefObject<T | null>).current = node;
      }
    });
  };
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
