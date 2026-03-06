import { twMerge } from 'tailwind-merge';
import { memo, PropsWithChildren } from 'react';

const gapperSizeClasses = {
  1: 'gap-1',
  2: 'gap-2',
  4: 'gap-4',
  6: 'gap-6',
  8: 'gap-8',
  16: 'gap-16',
  32: 'gap-32',
};

export type GapperSize = keyof typeof gapperSizeClasses;

export interface GapperProps extends PropsWithChildren {
  size?: GapperSize;
  horizontal?: boolean;
  className?: string;
}

export const Gapper = memo(({ horizontal, size = 4, children, className }: GapperProps) => {
  return (
    <div className={twMerge('flex', horizontal ? 'flex-row' : 'flex-col', gapperSizeClasses[size], className)}>
      {children}
    </div>
  );
});
