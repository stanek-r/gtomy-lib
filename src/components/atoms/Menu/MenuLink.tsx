import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

export function MenuLink({ children, ...other }: LinkProps) {
  return (
    <li>
      <Link {...other}>{children}</Link>
    </li>
  );
}
