import React, { ElementType, ForwardedRef } from 'react';
import { forwardRefWithTypes, PropsAs } from '@/utils';
import { twMerge } from 'tailwind-merge';
import { Icon, IconType } from '@/components/atoms/Icon';

export interface MenuBottomItemProps<T extends ElementType> {
  as?: T;
  icon?: IconType;
  name: string;
  active?: boolean | ((name: string) => boolean);
}

function MenuBottomItemInner<T extends ElementType = 'button'>(
  { as, icon, children, className, active, name, ...other }: PropsAs<MenuBottomItemProps<T>, T>,
  ref: ForwardedRef<HTMLButtonElement>
) {
  const Component = as ?? 'button';
  const type = Component === 'button' ? 'button' : undefined;

  if (active && typeof active === 'function') {
    active = active(name);
  }

  return (
    <Component ref={ref} type={type} className={twMerge(active && 'active', className)} {...other}>
      <Icon icon={icon} />
      <span className="btm-nav-label">{children}</span>
    </Component>
  );
}

export const MenuBottomItem = forwardRefWithTypes(MenuBottomItemInner);
