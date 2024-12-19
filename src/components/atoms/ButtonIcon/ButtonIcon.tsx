import { ElementType, useCallback, useState } from 'react';
import { PropsAs } from '@/utils/typeHelpers';
import { twMerge } from 'tailwind-merge';
import { ButtonError } from '@/components/atoms/Button/ButtonError';
import { buttonColorClasses, buttonSizeClasses } from '@/components/atoms/Button/Button';
import { Icon, IconType } from '@/components/atoms/Icon/Icon';

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

export function ButtonIcon<T extends ElementType = 'button'>({
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
}: PropsAs<ButtonIconProps<T>, T>) {
  const Component = as ?? 'button';
  const type = Component === 'button' ? 'button' : undefined;
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleOnClick = useCallback(
    async (event: any) => {
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
    },
    [onClick, loading, disabled, setLoading, setError]
  );

  return (
    <Component
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
