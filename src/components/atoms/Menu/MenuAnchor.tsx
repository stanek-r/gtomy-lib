import React, { ComponentProps } from 'react';

export function MenuAnchor({ children, ...other }: ComponentProps<'a'>) {
  return (
    <li>
      <a {...other}>{children}</a>
    </li>
  );
}
