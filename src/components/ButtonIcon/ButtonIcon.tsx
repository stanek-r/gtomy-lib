import { ElementType } from 'react';
import { twJoin } from 'tailwind-merge';
import { PropsAs } from '@/utils/typeHelpers.core';
import { ButtonIconProps, buttonVariantClasses } from '@/components/ButtonIcon/ButtonIcon.core';
import { buttonColorClasses, buttonSizeClasses } from '@/components/Button/Button.core';
import { Icon } from '@/components/Icon/Icon';

export function ButtonIcon<T extends ElementType = 'button'>({
  as,
  color,
  size,
  className,
  icon,
  variant = 'square',
  outline,
  loading,
  ...other
}: PropsAs<ButtonIconProps<T>, T>) {
  const Component = as ?? 'button';
  const type = Component === 'button' ? 'button' : undefined;

  const classes = twJoin(
    'btn',
    color && buttonColorClasses[color],
    size && buttonSizeClasses[size],
    variant && buttonVariantClasses[variant],
    outline && 'btn-outline',
    className
  );

  return (
    <Component type={type} className={classes} {...other}>
      {loading ? <span className="loading loading-spinner size-6"></span> : <Icon icon={icon} size="lg" />}
    </Component>
  );
}
