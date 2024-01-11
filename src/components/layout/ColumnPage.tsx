import React, { ReactNode } from 'react';
import classNames from 'classnames';

export const columnPageWidthClasses = {
  sm: 'w-[640px]',
  md: 'w-[768px]',
  lg: 'w-[1024px]',
  xl: 'w-[1280px]',
  '2xl': 'w-[1536px]',
};

export interface ColumnPageProps {
  children?: ReactNode;
  width?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export function ColumnPage({ children, width = 'xl' }: ColumnPageProps) {
  const widthClass = columnPageWidthClasses[width];

  return <div className={classNames('max-w-full mx-auto flex flex-col gap-4 p-4', widthClass)}>{children}</div>;
}
