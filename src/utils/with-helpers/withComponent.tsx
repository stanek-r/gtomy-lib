import { FunctionComponent } from 'react';

/**
 * Add a component as a child to a parent component.
 *
 * @param {FunctionComponent | JSX.Element} Component - The component to be added.
 * @returns {JSX.Element | undefined} The parent component with the added child component.
 */
export function withComponent(Component?: FunctionComponent | JSX.Element): JSX.Element | undefined {
  return Component != null ? typeof Component === 'function' ? <Component /> : Component : undefined;
}
