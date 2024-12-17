import { ElementType } from 'react';
import { PropsAs } from '@/utils';
import { twMerge } from 'tailwind-merge';

export interface FooterItemProps<T extends ElementType> {
  as?: T;
}

export function FooterItem<T extends ElementType = 'button'>({
  as,
  children,
  className,
  ...other
}: PropsAs<FooterItemProps<T>, T>) {
  const Component = as ?? 'button';
  const type = Component === 'button' ? 'button' : undefined;

  return (
    <Component type={type} className={twMerge('link link-hover', className)} {...other}>
      {children}
    </Component>
  );
}
