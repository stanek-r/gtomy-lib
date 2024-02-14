import React, { FunctionComponent, ReactNode } from 'react';

export interface FormPageProps {
  menu?: FunctionComponent;
  footer?: FunctionComponent;
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
