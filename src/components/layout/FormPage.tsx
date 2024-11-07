import { FunctionComponent, ReactNode, useContext } from 'react';
import { LayoutContext } from '@/components/layout/LayoutProvider';
import { WithComponent } from '@/components/layout/WithComponent';

export interface FormPageProps {
  MenuComponent?: FunctionComponent | JSX.Element;
  FooterComponent?: FunctionComponent | JSX.Element;
  children?: ReactNode;
}

export function FormPage({
  MenuComponent: ForceMenuComponent,
  FooterComponent: ForceFooterComponent,
  children,
}: FormPageProps) {
  const { MenuComponent, FooterComponent } = useContext(LayoutContext);
  return (
    <div className="flex h-screen flex-col">
      <WithComponent Component={ForceMenuComponent ?? MenuComponent} />
      {children}
      <WithComponent Component={ForceFooterComponent ?? FooterComponent} />
    </div>
  );
}
