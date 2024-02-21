import React, { ComponentType, FunctionComponent, LazyExoticComponent, Suspense } from 'react';
import { PermRoles } from '@/utils/hooks';
import { RequireAuth } from '@/components/auth';
import { LoadingState } from '@/components/atoms/LoadingState';

export function withRequireAuth(
  Component: FunctionComponent | JSX.Element,
  minimalRole: PermRoles,
  MenuComponent?: FunctionComponent,
  FooterComponent?: FunctionComponent
): JSX.Element {
  return (
    <RequireAuth
      minimalRole={minimalRole}
      menu={MenuComponent != null ? <MenuComponent /> : undefined}
      footer={FooterComponent != null ? <FooterComponent /> : undefined}
    >
      {typeof Component === 'function' ? <Component /> : Component}
    </RequireAuth>
  );
}

export function withLazyPage(Component: LazyExoticComponent<ComponentType>) {
  return (
    <Suspense fallback={<LoadingState showLoading />}>
      <Component />
    </Suspense>
  );
}
