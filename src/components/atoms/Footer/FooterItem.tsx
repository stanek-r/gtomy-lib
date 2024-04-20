import { ElementType, ForwardedRef } from 'react';
import { forwardRefWithTypes, PropsAs } from '@/utils';
import { twMerge } from 'tailwind-merge';

export interface FooterItemProps<T extends ElementType> {
  as?: T;
}

function FooterItemInner<T extends ElementType = 'button'>(
  { as, children, className, ...other }: PropsAs<FooterItemProps<T>, T>,
  ref: ForwardedRef<HTMLButtonElement>
) {
  const Component = as ?? 'button';
  const type = Component === 'button' ? 'button' : undefined;

  return (
    <Component ref={ref} type={type} className={twMerge('link link-hover', className)} {...other}>
      {children}
    </Component>
  );
}

export const FooterItem = forwardRefWithTypes(FooterItemInner);
