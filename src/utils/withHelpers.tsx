import React, { ComponentType, FunctionComponent, LazyExoticComponent, Suspense } from 'react';
import { PermRoles } from '@/utils/hooks';
import { RequireAuth } from '@/components/auth';
import { LoadingState } from '@/components/atoms/LoadingState';

export function withRequireAuth(
  Component: FunctionComponent | JSX.Element,
  minimalRole: PermRoles,
  MenuComponent?: FunctionComponent | JSX.Element,
  FooterComponent?: FunctionComponent | JSX.Element
): JSX.Element {
  return (
    <RequireAuth
      minimalRole={minimalRole}
      menu={MenuComponent != null ? typeof MenuComponent === 'function' ? <MenuComponent /> : MenuComponent : undefined}
      footer={
        FooterComponent != null ? (
          typeof FooterComponent === 'function' ? (
            <FooterComponent />
          ) : (
            FooterComponent
          )
        ) : undefined
      }
    >
      {typeof Component === 'function' ? <Component /> : Component}
    </RequireAuth>
  );
}

export function withLazyPage(
  Component: LazyExoticComponent<ComponentType>,
  MenuComponent?: FunctionComponent | JSX.Element,
  FooterComponent?: FunctionComponent | JSX.Element
): JSX.Element {
  return (
    <>
      {MenuComponent != null ? typeof MenuComponent === 'function' ? <MenuComponent /> : MenuComponent : undefined}
      <Suspense fallback={<LoadingState showLoading />}>
        <Component />
      </Suspense>
      {FooterComponent != null ? (
        typeof FooterComponent === 'function' ? (
          <FooterComponent />
        ) : (
          FooterComponent
        )
      ) : undefined}
    </>
  );
}
