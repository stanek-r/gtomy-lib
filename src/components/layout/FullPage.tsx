import React, { ReactNode } from 'react';
import classNames from 'classnames';

export interface FullPageProps {
  children?: ReactNode;
  scrollable?: boolean;
}

export function FullPage({ children, scrollable }: FullPageProps) {
  return (
    <div
      className={classNames(
        'absolute w-screen flex flex-col justify-center items-center gap-4 text-center p-4',
        scrollable ? 'min-h-screen' : 'h-screen'
      )}
    >
      {children}
    </div>
  );
}
