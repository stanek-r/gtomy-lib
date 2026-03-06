import { ElementType, useMemo } from 'react';
import { PropsAs } from '@/utils/typeHelpers.core';
import { twMerge } from 'tailwind-merge';
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

  const classes = twMerge(
    'btn',
    color && buttonColorClasses[color],
    size && buttonSizeClasses[size],
    outline && 'btn-outline',
    wide && 'btn-wide',
    glass && 'glass',
    className
  );

  const resolvedStartIcon = useMemo(
    () =>
      loading && startIcon == null ? <span className="loading loading-spinner loading-sm mr-1.5"></span> : startIcon,
    [loading, startIcon]
  );
  const resolvedEndIcon = useMemo(
    () =>
      loading && startIcon != null && endIcon == null ? (
        <span className="loading loading-spinner loading-sm ml-1.5"></span>
      ) : (
        endIcon
      ),
    [endIcon, loading, startIcon]
  );

  return (
    <Component type={type} className={classes} {...other}>
      <Icon icon={resolvedStartIcon} />
      {children}
      <Icon icon={resolvedEndIcon} />
    </Component>
  );
}
