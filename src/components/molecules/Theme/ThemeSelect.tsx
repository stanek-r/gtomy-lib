import React, { ComponentPropsWithRef } from 'react';
import classNames from 'classnames';

export type ThemeSelectProps = ComponentPropsWithRef<'select'>;

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
