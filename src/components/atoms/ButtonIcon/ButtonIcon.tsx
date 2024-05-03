import { ElementType, ForwardedRef, useState } from 'react';
import { buttonColorClasses, buttonSizeClasses } from '@/components/atoms/Button';
import { forwardRefWithTypes, PropsAs } from '@/utils/typeHelpers';
import { twMerge } from 'tailwind-merge';
import { Icon, IconType } from '@/components/atoms/Icon';
import { ButtonError } from '@/components/atoms/Button/ButtonError';

export const buttonVariantClasses = {
  square: 'btn-square',
  circle: 'btn-circle',
};

export interface ButtonIconProps<T extends ElementType> {
  as?: T;
  variant?: 'square' | 'circle';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'ghost';
  size?: 'sm' | 'lg';
  icon: IconType;
  outline?: true;
}

function ButtonIconInner<T extends ElementType = 'button'>(
  {
    as,
    color,
    size,
    className,
    icon,
    variant = 'square',
    outline,
    onClick,
    disabled,
    title,
    ...other
  }: PropsAs<ButtonIconProps<T>, T>,
  ref: ForwardedRef<HTMLButtonElement>
) {
  const Component = as ?? 'button';
  const type = Component === 'button' ? 'button' : undefined;
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleOnClick = async (event: any) => {
    if (onClick == null || loading || disabled) {
      return;
    }
    setLoading(true);
    try {
      await onClick(event);
      setError(null);
    } catch (e) {
      if (e instanceof ButtonError) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Component
      ref={ref}
      type={type}
      className={twMerge(
        'btn',
        color && buttonColorClasses[color],
        size && buttonSizeClasses[size],
        variant && buttonVariantClasses[variant],
        outline && 'btn-outline',
        className
      )}
      onClick={handleOnClick}
      disabled={disabled}
      title={error == null ? title : error}
      {...other}
    >
      {loading ? <span className="loading loading-spinner size-6"></span> : <Icon icon={icon} size="lg" />}
    </Component>
  );
}

export const ButtonIcon = forwardRefWithTypes(ButtonIconInner);
