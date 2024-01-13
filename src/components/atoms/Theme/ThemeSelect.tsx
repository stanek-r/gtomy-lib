import React, { ComponentPropsWithRef } from 'react';
import classNames from 'classnames';
import { useTranslation } from '@/utils/hooks/useTranslation';

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
  const { t } = useTranslation('common');

  return (
    <select data-choose-theme className={classNames('select select-bordered', className)} {...other}>
      {children ? (
        children
      ) : (
        <>
          <option value="">{t('theme.system')}</option>
          <option value="corporate">{t('theme.light')}</option>
          <option value="business">{t('theme.dark')}</option>
        </>
      )}
    </select>
  );
}
