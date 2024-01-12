import React, { ComponentProps } from 'react';
import classNames from 'classnames';

export function FooterAnchor({ children, className, ...other }: ComponentProps<'a'>) {
  return (
    <a className={classNames('link link-hover', className)} {...other}>
      {children}
    </a>
  );
}
