import { ElementType } from 'react';
import { PropsAs } from '@/utils/typeHelpers';

export interface MenuItemProps<T extends ElementType> {
  as?: T;
}

export function MenuItem<T extends ElementType = 'button'>({ as, children, ...other }: PropsAs<MenuItemProps<T>, T>) {
  const Component = as ?? 'button';
  const type = Component === 'button' ? 'button' : undefined;

  return (
    <li>
      <Component type={type} {...other}>
        {children}
      </Component>
    </li>
  );
}
