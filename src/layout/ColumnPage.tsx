import { twMerge } from 'tailwind-merge';
import { WithComponent, WithComponentComponent } from '@/layout/WithComponent';
import { memo, PropsWithChildren, useMemo } from 'react';

const columnPageWidthClasses = {
  sm: 'w-[640px]',
  md: 'w-[768px]',
  lg: 'w-[1024px]',
  xl: 'w-[1280px]',
  '2xl': 'w-[1536px]',
};

export interface ColumnPageProps extends PropsWithChildren {
  MenuComponent?: WithComponentComponent;
  FooterComponent?: WithComponentComponent;
  width?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
}

export const ColumnPage = memo(
  ({ MenuComponent, FooterComponent, children, width = 'xl', className }: ColumnPageProps) => {
    const widthClass = useMemo(() => columnPageWidthClasses[width], [width]);

    return (
      <div className="min-h-screen flex flex-col">
        <WithComponent Component={MenuComponent} />
        <div className={twMerge('max-w-full mx-auto flex flex-col gap-4 px-4 py-8 flex-1', widthClass, className)}>
          {children}
          <div className="h-20"></div>
        </div>
        <WithComponent Component={FooterComponent} />
      </div>
    );
  }
);
