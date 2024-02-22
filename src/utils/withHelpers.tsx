import React, { ComponentType, FunctionComponent, LazyExoticComponent, Suspense } from 'react';
import { PERM_ROLES, PermRoles, User } from '@/utils/hooks';
import { RequireAuth } from '@/components/auth';
import { LoadingState } from '@/components/atoms/LoadingState';
import { ColumnPage, FormPage } from '@/components/layout';
import { getUsersRoleId } from '@/utils/auth';

export function withColumnPage(
  Component: FunctionComponent | JSX.Element,
  MenuComponent?: FunctionComponent | JSX.Element,
  FooterComponent?: FunctionComponent | JSX.Element,
  width?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
): JSX.Element {
  return (
    <ColumnPage menu={withComponent(MenuComponent)} footer={withComponent(FooterComponent)} width={width}>
      {withComponent(Component)}
    </ColumnPage>
  );
}

export function withFormPage(
  Component: FunctionComponent | JSX.Element,
  MenuComponent?: FunctionComponent | JSX.Element,
  FooterComponent?: FunctionComponent | JSX.Element
): JSX.Element {
  return (
    <FormPage menu={withComponent(MenuComponent)} footer={withComponent(FooterComponent)}>
      {withComponent(Component)}
    </FormPage>
  );
}

export function withRequireAuth(
  Component: FunctionComponent | JSX.Element,
  minimalRole: PermRoles,
  MenuComponent?: FunctionComponent | JSX.Element,
  FooterComponent?: FunctionComponent | JSX.Element
): JSX.Element {
  return (
    <RequireAuth minimalRole={minimalRole} menu={withComponent(MenuComponent)} footer={withComponent(FooterComponent)}>
      {withComponent(Component)}
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
      {withComponent(MenuComponent)}
      <Suspense fallback={<LoadingState showLoading />}>
        <Component />
      </Suspense>
      {withComponent(FooterComponent)}
    </>
  );
}

export function withPermission(
  Component: FunctionComponent | JSX.Element,
  minimalRole: PermRoles,
  user?: User,
  application?: string
): JSX.Element | undefined {
  if (user == null || getUsersRoleId(user, application) < PERM_ROLES[minimalRole]) {
    return undefined;
  }
  return withComponent(Component);
}

export function withComponent(Component?: FunctionComponent | JSX.Element): JSX.Element | undefined {
  return Component != null ? typeof Component === 'function' ? <Component /> : Component : undefined;
}
