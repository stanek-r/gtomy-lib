import { ComponentType, FunctionComponent, LazyExoticComponent, Suspense } from 'react';
import { PermRoles } from '@/utils/hooks/storage';
import { RequireAuth, RequirePermission } from '@/components/auth';
import { withComponent } from '@/utils/with-helpers/withComponent';
import { withFormPage } from '@/utils/with-helpers/withLayout';
import { LoadingState } from '@/components/atoms/LoadingState';

/**
 * Provides a higher-order component that enables authentication validation for a given component.
 *
 * @param {FunctionComponent | JSX.Element} Component - The component to be wrapped with authentication validation.
 * @param {PermRoles} minimalRole - The minimal role required for the user to access the wrapped component.
 * @param {boolean} [displayRequestAccess] - Whether access request button should be displayed if user doesn't have access.
 * @param {string} [application] - The application name if the user's role depends on the application context.
 * @param {FunctionComponent | JSX.Element} [MenuComponent] - The optional menu that will replace provided Menu component.
 * @param {FunctionComponent | JSX.Element} [FooterComponent] - The optional footer that will replace provided Footer component.
 *
 * @returns {JSX.Element} - The wrapped component with authentication validation.
 */
export function withRequireAuth(
  Component: FunctionComponent | JSX.Element,
  minimalRole?: PermRoles,
  displayRequestAccess?: boolean,
  application?: string,
  MenuComponent?: FunctionComponent | JSX.Element,
  FooterComponent?: FunctionComponent | JSX.Element
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
 * @param {string} [application] - The application name if the user's role depends on the application context.
 *
 * @returns {JSX.Element | undefined} - The executed component if the user has the required permission, otherwise undefined.
 */
export function withPermission(
  Component: FunctionComponent | JSX.Element,
  minimalRole?: PermRoles,
  application?: string
): JSX.Element {
  return (
    <RequirePermission minimalRole={minimalRole} application={application}>
      {withComponent(Component)}
    </RequirePermission>
  );
}
