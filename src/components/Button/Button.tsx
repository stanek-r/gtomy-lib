import { ElementType } from 'react';
import { PropsAs } from '@/utils/typeHelpers.core';
import { twJoin } from 'tailwind-merge';
import { Icon } from '@/components/Icon/Icon';
import { buttonColorClasses, ButtonProps, buttonSizeClasses } from '@/components/Button/Button.core';

export function Button<T extends ElementType = 'button'>({
  as,
  children,
  color,
  size,
  className,
  startIcon,
  endIcon,
  outline,
  wide,
  glass,
  loading,
  ...other
}: PropsAs<ButtonProps<T>, T>) {
  const Component = as ?? 'button';
  const type = Component === 'button' ? 'button' : undefined;

  const classes = twJoin(
    'btn',
    color && buttonColorClasses[color],
    size && buttonSizeClasses[size],
    outline && 'btn-outline',
    wide && 'btn-wide',
    glass && 'glass',
    className
  );

  if (loading) {
    if (startIcon == null) {
      startIcon = <span className="loading loading-spinner loading-sm mr-1.5"></span>;
    } else if (endIcon == null) {
      endIcon = <span className="loading loading-spinner loading-sm ml-1.5"></span>;
    }
  }

  return (
    <Component type={type} className={classes} {...other}>
      <Icon icon={startIcon} className="mr-1.5" />
      {children}
      <Icon icon={endIcon} className="ml-1.5" />
    </Component>
  );
}
