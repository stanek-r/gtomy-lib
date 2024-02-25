import React, { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export interface FullPageProps {
  children?: ReactNode;
  scrollable?: boolean;
  className?: string;
}

/**
 * @deprecated Use FormPage instead
 */
export function FullPage({ children, scrollable, className }: FullPageProps) {
  return (
    <div
      className={twMerge(
        'absolute w-screen flex flex-col justify-center items-center gap-4 text-center p-4',
        scrollable ? 'min-h-screen' : 'h-screen',
        className
      )}
    >
      {children}
    </div>
  );
}
