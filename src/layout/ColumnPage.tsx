import { twMerge } from 'tailwind-merge';
import { WithComponent } from '@/layout/WithComponent';
import { ColumnPageProps, columnPageWidthClasses } from '@/layout/ColumnPage.core';

export function ColumnPage({
  MenuComponent,
  FooterComponent,
  children,
  width = 'xl',
  className,
  ...other
}: ColumnPageProps) {
  const widthClass = columnPageWidthClasses[width];

  return (
    <div className="min-h-screen flex flex-col" {...other}>
      <WithComponent Component={MenuComponent} />
      <div className={twMerge('max-w-full mx-auto flex flex-col gap-4 px-4 py-8 flex-1', widthClass, className)}>
        {children}
        <div className="h-20"></div>
      </div>
      <WithComponent Component={FooterComponent} />
    </div>
  );
}
