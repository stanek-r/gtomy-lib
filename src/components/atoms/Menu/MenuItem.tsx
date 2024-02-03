import React, { ElementType, ForwardedRef } from 'react';
import { forwardRefWithTypes, PropsAs } from '@/utils';

export interface MenuItemProps<T extends ElementType> {
  as?: T;
}

function MenuItemInner<T extends ElementType = 'button'>(
  { as, children, ...other }: PropsAs<MenuItemProps<T>, T>,
  ref: ForwardedRef<HTMLButtonElement>
) {
  const Component = as ?? 'button';
  const type = Component === 'button' ? 'button' : undefined;

  return (
    <li>
      <Component ref={ref} type={type} {...other}>
        {children}
      </Component>
    </li>
  );
}

export const MenuItem = forwardRefWithTypes(MenuItemInner);
