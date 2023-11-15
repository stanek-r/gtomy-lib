import React, { HTMLProps } from 'react';
import { Typography } from './Typography';

export interface TextProps extends Omit<Omit<HTMLProps<HTMLSpanElement>, 'color'>, 'size'> {
  as?: 'p' | 'span';
  color?: 'inherit' | 'white' | 'gray' | 'lightgray' | 'red';
  decoration?: 'underline' | 'line-through' | 'overline';
}

export function Text({ as = 'p', color = 'white', ...other }: TextProps) {
  return <Typography as={as} color={color} size="base" {...other} />;
}
