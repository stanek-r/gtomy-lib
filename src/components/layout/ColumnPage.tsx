import { FunctionComponent, ReactNode, useContext } from 'react';
import { twMerge } from 'tailwind-merge';
import { LayoutContext } from '@/components/layout/LayoutProvider';
import { withComponent } from '@/utils/with-helpers/withComponent';

export const columnPageWidthClasses = {
  sm: 'w-[640px]',
  md: 'w-[768px]',
  lg: 'w-[1024px]',
  xl: 'w-[1280px]',
  '2xl': 'w-[1536px]',
};

export interface ColumnPageProps {
  MenuComponent?: FunctionComponent | JSX.Element;
  FooterComponent?: FunctionComponent | JSX.Element;
  children?: ReactNode;
  width?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
}

export function ColumnPage({
  MenuComponent: ForceMenuComponent,
  FooterComponent: ForceFooterComponent,
  children,
  width = 'xl',
  className,
}: ColumnPageProps) {
  const { MenuComponent, FooterComponent } = useContext(LayoutContext);
  const widthClass = columnPageWidthClasses[width];

  return (
    <>
      {withComponent(ForceMenuComponent ?? MenuComponent)}
      <div className={twMerge('max-w-full mx-auto flex flex-col gap-4 px-4 py-8 flex-1', widthClass, className)}>
        {children}
      </div>
      {withComponent(ForceFooterComponent ?? FooterComponent)}
    </>
  );
}
