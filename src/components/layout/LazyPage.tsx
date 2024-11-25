import { LoadingState } from '@/components/atoms/LoadingState';
import { ComponentType, FunctionComponent, LazyExoticComponent, Suspense, useContext } from 'react';
import { LayoutContext } from '@/components/layout/LayoutProvider';
import { ColumnPage } from '@/components/layout/ColumnPage';

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
        <ColumnPage
          MenuComponent={ForceMenuComponent ?? MenuComponent}
          FooterComponent={ForceFooterComponent ?? FooterComponent}
        >
          <LoadingState showLoading className="flex-1 justify-center" />
        </ColumnPage>
      }
    >
      <Component />
    </Suspense>
  );
}
