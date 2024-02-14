import React, { ReactNode } from 'react';

export interface FormPageProps {
  menu?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
}

export function FormPage({ menu, footer, children }: FormPageProps) {
  return (
    <div className="flex h-screen flex-col">
      <>
        {menu}
        {children}
        {footer}
      </>
    </div>
  );
}
