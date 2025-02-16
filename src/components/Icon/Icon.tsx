import { createElement, ReactElement } from 'react';
import { twMerge } from 'tailwind-merge';
import { isSvgIcon } from '@/utils/svg.core';
import { IconProps, iconSizeClasses } from '@/components/Icon/Icon.core';
import { typographyColorClasses, typographyContentColorClasses } from '@/components/Typography/Typography.core';

export function Icon({
  icon,
  size = 'md',
  color = 'inherit',
  content = true,
  className,
}: IconProps): ReactElement | null {
  if (icon == null) {
    return null;
  }
  if (isSvgIcon(icon)) {
    const classes = twMerge(
      'shrink-0',
      iconSizeClasses[size],
      color && (content ? typographyContentColorClasses[color] : typographyColorClasses[color]),
      className
    );
    return createElement(icon, {
      className: classes,
      'aria-hidden': true,
    });
  }
  return icon;
}
