import { CenteredPageProps } from '@/layout/CenteredPage.core';
import { twMerge } from 'tailwind-merge';

export function CenteredPage({ children, className }: CenteredPageProps) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6">
      <div className={twMerge('flex flex-col gap-6', className)}>{children}</div>
    </div>
  );
}
