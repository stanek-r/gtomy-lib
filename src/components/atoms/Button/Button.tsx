import { ElementType, useCallback, useState } from 'react';
import { PropsAs } from '@/utils/typeHelpers';
import { twMerge } from 'tailwind-merge';
import { Icon, IconType } from '@/components/atoms/Icon';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { ButtonError } from '@/components/atoms/Button/ButtonError';

export const buttonColorClasses = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  success: 'btn-success',
  error: 'btn-error',
  warning: 'btn-warning',
  info: 'btn-info',
  ghost: 'btn-ghost',
};

export const buttonSizeClasses = {
  sm: 'btn-sm',
  lg: 'btn-lg',
};

export interface ButtonProps<T extends ElementType> {
  as?: T;
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'ghost';
  size?: 'sm' | 'lg';
  wide?: boolean;
  glass?: boolean;
  startIcon?: IconType;
  endIcon?: IconType;
  outline?: true;
}

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
  onClick,
  disabled,
  title,
  ...other
}: PropsAs<ButtonProps<T>, T>) {
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

  if (loading) {
    if (startIcon == null) {
      startIcon = <span className="loading loading-spinner loading-sm mr-1.5"></span>;
    } else if (endIcon == null) {
      endIcon = <span className="loading loading-spinner loading-sm ml-1.5"></span>;
    }
  } else if (error) {
    if (startIcon == null) {
      startIcon = <Icon icon={ExclamationTriangleIcon} className="mr-1.5" />;
    } else if (endIcon == null) {
      endIcon = <Icon icon={ExclamationTriangleIcon} className="ml-1.5" />;
    }
  }

  return (
    <Component
      type={type}
      className={twMerge(
        'btn',
        color && buttonColorClasses[color],
        size && buttonSizeClasses[size],
        outline && 'btn-outline',
        wide && 'btn-wide',
        glass && 'glass',
        className
      )}
      onClick={handleOnClick}
      disabled={disabled}
      title={error == null ? title : error}
      {...other}
    >
      <Icon icon={startIcon} className="mr-1.5" />
      {children}
      <Icon icon={endIcon} className="ml-1.5" />
    </Component>
  );
}
