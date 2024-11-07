import { FormPage } from '@/components/layout/FormPage';
import { LoadingState } from '@/components/atoms/LoadingState';
import { ComponentType, FunctionComponent, LazyExoticComponent, Suspense, useContext } from 'react';
import { LayoutContext } from '@/components/layout/LayoutProvider';

export interface LazyPageProps {
  Component: LazyExoticComponent<ComponentType>;
  MenuComponent?: FunctionComponent | JSX.Element;
  FooterComponent?: FunctionComponent | JSX.Element;
}

export function LazyPage({
  MenuComponent: ForceMenuComponent,
  FooterComponent: ForceFooterComponent,
  Component,
}: LazyPageProps) {
  const { MenuComponent, FooterComponent } = useContext(LayoutContext);

  return (
    <Suspense
      fallback={
        <FormPage
          MenuComponent={ForceMenuComponent ?? MenuComponent}
          FooterComponent={ForceFooterComponent ?? FooterComponent}
        >
          <LoadingState showLoading className="flex-1 justify-center" />
        </FormPage>
      }
    >
      <Component />
    </Suspense>
  );
}
