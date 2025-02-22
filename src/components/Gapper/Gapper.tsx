import { GapperProps, gapperSizeClasses } from '@/components/Gapper/Gapper.core';
import { twMerge } from 'tailwind-merge';

export function Gapper({ horizontal, size = 'md', children, className }: GapperProps) {
  const classes = twMerge('flex', horizontal ? 'flex-row' : 'flex-col', gapperSizeClasses[size], className);
  return <div className={classes}>{children}</div>;
}
