import React, { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export const columnPageWidthClasses = {
  sm: 'w-[640px]',
  md: 'w-[768px]',
  lg: 'w-[1024px]',
  xl: 'w-[1280px]',
  '2xl': 'w-[1536px]',
};

export interface ColumnPageProps {
  menu?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
  width?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
}

export function ColumnPage({ menu, footer, children, width = 'xl', className }: ColumnPageProps) {
  const widthClass = columnPageWidthClasses[width];

  return (
    <>
      {menu}
      <div className={twMerge('max-w-full mx-auto flex flex-col gap-4 px-4 py-8 flex-1', widthClass, className)}>
        {children}
      </div>
      {footer}
    </>
  );
}
