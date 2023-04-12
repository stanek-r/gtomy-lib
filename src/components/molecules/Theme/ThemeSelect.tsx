import React, { ComponentPropsWithRef } from 'react';
import classNames from 'classnames';

export type ThemeSelectProps = ComponentPropsWithRef<'select'>;

/**
 * A React component that renders a `<select>` element for choosing a theme.
 * The component can be used to provide a simple way for users to choose between different themes, such as light and dark modes.
 *
 * @example
 * function MyComponent() {
 *   return (
 *     <ThemeSelect/>
 *   );
 * }
 *
 * @example
 * function MyComponent() {
 *   return (
 *     <ThemeSelect>
 *       <option value="">System default</option>
 *       <option value="corporate">Light</option>
 *       <option value="business">Dark</option>
 *     </ThemeSelect>
 *   );
 * }
 *
 * @param props - Props for the ThemeSelect component, including className and other select element props.
 * @return The ThemeSelect component.
 */
export function ThemeSelect({ className, children, ...other }: ThemeSelectProps) {
  return (
    <select data-choose-theme className={classNames('select', className)} {...other}>
      {children ? (
        children
      ) : (
        <>
          <option value="">System default</option>
          <option value="corporate">Light</option>
          <option value="business">Dark</option>
        </>
      )}
    </select>
  );
}
