import { ElementType } from 'react';
import { PropsAs } from '@/utils';
import { twMerge } from 'tailwind-merge';
import { Icon, IconType } from '@/components/atoms/Icon';

export interface MenuBottomItemProps<T extends ElementType> {
  as?: T;
  icon?: IconType;
  name: string;
  active?: boolean | ((name: string) => boolean);
}

export function MenuBottomItem<T extends ElementType = 'button'>({
  as,
  icon,
  children,
  className,
  active,
  name,
  ...other
}: PropsAs<MenuBottomItemProps<T>, T>) {
  const Component = as ?? 'button';
  const type = Component === 'button' ? 'button' : undefined;

  if (active && typeof active === 'function') {
    active = active(name);
  }

  return (
    <Component type={type} className={twMerge(active && 'active', className)} {...other}>
      <Icon icon={icon} />
      <span className="btm-nav-label">{children}</span>
    </Component>
  );
}
