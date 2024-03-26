import React, { ElementType, ForwardedRef, ReactNode } from 'react';
import { forwardRefWithTypes, PropsAs } from '@/utils';
import { isSvgIcon, SvgIconType } from '@/models';
import { twMerge } from 'tailwind-merge';

export interface MenuBottomItemProps<T extends ElementType> {
  as?: T;
  icon?: ReactNode | SvgIconType;
  name: string;
  active?: boolean | ((name: string) => boolean);
}

function MenuBottomItemInner<T extends ElementType = 'button'>(
  { as, icon, children, className, active, name, ...other }: PropsAs<MenuBottomItemProps<T>, T>,
  ref: ForwardedRef<HTMLButtonElement>
) {
  const Component = as ?? 'button';
  const type = Component === 'button' ? 'button' : undefined;

  if (isSvgIcon(icon)) {
    icon = React.createElement(icon, { className: 'size-5 shrink-0' });
  }
  if (active && typeof active === 'function') {
    active = active(name);
  }

  return (
    <Component ref={ref} type={type} className={twMerge(active && 'active', className)} {...other}>
      {icon}
      <span className="btm-nav-label">{children}</span>
    </Component>
  );
}

export const MenuBottomItem = forwardRefWithTypes(MenuBottomItemInner);
