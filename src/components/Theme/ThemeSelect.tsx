import React, { ComponentPropsWithRef } from 'react';
import classNames from 'classnames';

type Props = ComponentPropsWithRef<'select'>;

export function ThemeSelect({ className, children, ...other }: Props) {
  return (
    <select data-choose-theme className={classNames('select', className)} {...other}>
      <option value="">System default</option>
      <option value="corporate">Light</option>
      <option value="business">Dark</option>
      {children}
    </select>
  );
}
