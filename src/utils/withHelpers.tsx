import React, { ComponentType, FunctionComponent, LazyExoticComponent, Suspense } from 'react';
import { RequireAuth } from '@/components/auth';
import { LoadingState } from '@/components/atoms/LoadingState';
import { ColumnPage, FormPage } from '@/components/layout';
import { PermRoles } from '@/utils/hooks/storage';
import { RequirePermission } from '@/components/auth/RequirePermission';

/**
 * Renders a page with a column layout, consisting of a main component and optional menu and footer components.
 *
 * @param {FunctionComponent | JSX.Element} Component - The main component to render within the page.
 * @param {'sm' | 'md' | 'lg' | 'xl' | '2xl'} [width] - The optional width of the page layout.
 * @param {FunctionComponent | JSX.Element} [MenuComponent] - The optional menu that will replace provided Menu component.
 * @param {FunctionComponent | JSX.Element} [FooterComponent] - The optional footer that will replace provided Footer component.
 *
 * @returns {JSX.Element} The rendered column page.
 */
export function withColumnPage(
  Component: FunctionComponent | JSX.Element,
  width?: 'sm' | 'md' | 'lg' | 'xl' | '2xl',
  MenuComponent?: FunctionComponent | JSX.Element,
  FooterComponent?: FunctionComponent | JSX.Element
): JSX.Element {
  return (
    <ColumnPage MenuComponent={MenuComponent} FooterComponent={FooterComponent} width={width}>
      {withComponent(Component)}
    </ColumnPage>
  );
}

/**
 * Renders a page with a form by wrapping the component in a FormPage component.
 *
 * @param {FunctionComponent | JSX.Element} Component - The component to be wrapped with FormPage.
 * @param {FunctionComponent | JSX.Element} [MenuComponent] - The optional menu that will replace provided Menu component.
 * @param {FunctionComponent | JSX.Element} [FooterComponent] - The optional footer that will replace provided Footer component.
 * @returns {JSX.Element} - The resulting page with the provided components wrapped in FormPage.
 */
export function withFormPage(
  Component: FunctionComponent | JSX.Element,
  MenuComponent?: FunctionComponent | JSX.Element,
  FooterComponent?: FunctionComponent | JSX.Element
): JSX.Element {
  return (
    <FormPage MenuComponent={MenuComponent} FooterComponent={FooterComponent}>
      {withComponent(Component)}
    </FormPage>
  );
}

/**
 * Provides a higher-order component that enables authentication validation for a given component.
 *
 * @param {FunctionComponent | JSX.Element} Component - The component to be wrapped with authentication validation.
 * @param {PermRoles} minimalRole - The minimal role required for the user to access the wrapped component.
 * @param {FunctionComponent | JSX.Element} [MenuComponent] - The optional menu that will replace provided Menu component.
 * @param {FunctionComponent | JSX.Element} [FooterComponent] - The optional footer that will replace provided Footer component.
 * @param {boolean} [displayRequestAccess] - Whether access request button should be displayed if user doesn't have access.
 * @param {string} [application] - The application name if the user's role depends on the application context.
 *
 * @returns {JSX.Element} - The wrapped component with authentication validation.
 */
export function withRequireAuth(
  Component: FunctionComponent | JSX.Element,
  minimalRole: PermRoles = 'user',
  MenuComponent?: FunctionComponent | JSX.Element,
  FooterComponent?: FunctionComponent | JSX.Element,
  displayRequestAccess?: boolean,
  application?: string
): JSX.Element {
  return (
    <RequireAuth
      minimalRole={minimalRole}
      application={application}
      MenuComponent={MenuComponent}
      FooterComponent={FooterComponent}
      displayRequestAccess={displayRequestAccess}
    >
      {withComponent(Component)}
    </RequireAuth>
  );
}

/**
 * Renders a lazy page component with a loading fallback.
 *
 * @param {LazyExoticComponent<ComponentType>} Component - The lazy page component to render.
 * @param {FunctionComponent | JSX.Element} [MenuComponent] - The optional menu that will replace provided Menu component.
 * @param {FunctionComponent | JSX.Element} [FooterComponent] - The optional footer that will replace provided Footer component.
 *
 * @returns {JSX.Element} The rendered lazy page component with a loading fallback.
 */
export function withLazyPage(
  Component: LazyExoticComponent<ComponentType>,
  MenuComponent?: FunctionComponent | JSX.Element,
  FooterComponent?: FunctionComponent | JSX.Element
): JSX.Element {
  return (
    <Suspense
      fallback={withFormPage(
        <LoadingState showLoading className="flex-1 justify-center" />,
        MenuComponent,
        FooterComponent
      )}
    >
      <Component />
    </Suspense>
  );
}

/**
 * Executes the given component if the user has the required permission.
 * Otherwise, returns undefined.
 *
 * @param {FunctionComponent | JSX.Element} Component - The component to execute.
 * @param {PermRoles} minimalRole - The minimal role required for the user.
 * @param {boolean} [displayWarning] - Whether whole alert should be displayed if user doesn't have access.
 * @param {boolean} [displayRequestAccess] - Whether access request button should be displayed if user doesn't have access.
 * @param {string} [application] - The application name if the user's role depends on the application context.
 *
 * @returns {JSX.Element | undefined} - The executed component if the user has the required permission, otherwise undefined.
 */
export function withPermission(
  Component: FunctionComponent | JSX.Element,
  minimalRole: PermRoles,
  displayWarning?: boolean,
  displayRequestAccess?: boolean,
  application?: string
): JSX.Element {
  return (
    <RequirePermission
      minimalRole={minimalRole}
      application={application}
      displayWarning={displayWarning}
      displayRequestAccess={displayRequestAccess}
    >
      {withComponent(Component)}
    </RequirePermission>
  );
}

/**
 * Add a component as a child to a parent component.
 *
 * @param {FunctionComponent | JSX.Element} Component - The component to be added.
 * @returns {JSX.Element | undefined} The parent component with the added child component.
 */
export function withComponent(Component?: FunctionComponent | JSX.Element): JSX.Element | undefined {
  return Component != null ? typeof Component === 'function' ? <Component /> : Component : undefined;
}
