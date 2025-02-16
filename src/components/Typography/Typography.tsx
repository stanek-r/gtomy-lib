import { ElementType } from 'react';
import { twMerge } from 'tailwind-merge';
import { PropsAs } from '@/utils/typeHelpers.core';
import {
  typographyColorClasses,
  typographyContentColorClasses,
  typographyDecorationClasses,
  TypographyProps,
  typographySizeClasses,
  typographyWeightClasses,
} from '@/components/Typography/Typography.core';

export function Typography<T extends ElementType = 'span'>({
  as,
  className,
  color = 'inherit',
  size = 'inherit',
  weight = 'inherit',
  decoration,
  content = true,
  ...other
}: PropsAs<TypographyProps<T>, T>) {
  const Component = as ?? 'span';

  const classes = twMerge(
    color && (content ? typographyContentColorClasses[color] : typographyColorClasses[color]),
    size && typographySizeClasses[size],
    weight && typographyWeightClasses[weight],
    decoration && typographyDecorationClasses[decoration],
    className
  );

  return <Component className={classes} {...other} />;
}
