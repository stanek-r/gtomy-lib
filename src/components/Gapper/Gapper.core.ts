import { PropsWithChildren } from 'react';

export const gapperSizeClasses = {
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
  '2xl': 'gap-16',
  '3xl': 'gap-32',
};

export type GapperSize = keyof typeof gapperSizeClasses;

export interface GapperProps extends PropsWithChildren {
  size?: GapperSize;
  horizontal?: true;
  className?: string;
}
