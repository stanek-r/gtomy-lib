import { FunctionComponent, PropsWithChildren, ReactElement } from 'react';

export const columnPageWidthClasses = {
  sm: 'w-[640px]',
  md: 'w-[768px]',
  lg: 'w-[1024px]',
  xl: 'w-[1280px]',
  '2xl': 'w-[1536px]',
};

export interface ColumnPageProps extends PropsWithChildren {
  MenuComponent?: FunctionComponent | ReactElement;
  FooterComponent?: FunctionComponent | ReactElement;
  width?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
}
