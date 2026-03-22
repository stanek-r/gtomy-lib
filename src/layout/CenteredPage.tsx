import { twMerge } from 'tailwind-merge';
import { memo, PropsWithChildren } from 'react';

export interface CenteredPageProps extends PropsWithChildren {
  className?: string;
}

export const CenteredPage = memo(({ children, className, ...other }: CenteredPageProps) => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6" {...other}>
      <div className={twMerge('flex flex-col gap-6', className)}>{children}</div>
    </div>
  );
});
