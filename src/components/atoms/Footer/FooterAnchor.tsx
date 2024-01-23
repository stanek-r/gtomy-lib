import React, { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

export function FooterAnchor({ children, className, ...other }: ComponentProps<'a'>) {
  return (
    <a className={twMerge('link link-hover', className)} {...other}>
      {children}
    </a>
  );
}
