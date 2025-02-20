import { twMerge } from 'tailwind-merge';
import { WithComponent } from '@/layout/WithComponent';
import { ColumnPageProps, columnPageWidthClasses } from '@/layout/ColumnPage.core';

export function ColumnPage({ MenuComponent, FooterComponent, children, width = 'xl', className }: ColumnPageProps) {
  const widthClass = columnPageWidthClasses[width];

  return (
    <>
      <WithComponent Component={MenuComponent} />
      <div className={twMerge('max-w-full mx-auto flex flex-col gap-4 px-4 py-8 flex-1', widthClass, className)}>
        {children}
      </div>
      <WithComponent Component={FooterComponent} />
    </>
  );
}
