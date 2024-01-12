import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import classNames from 'classnames';

export function FooterLink({ children, className, ...other }: LinkProps) {
  return (
    <Link className={classNames('link link-hover', className)} {...other}>
      {children}
    </Link>
  );
}
