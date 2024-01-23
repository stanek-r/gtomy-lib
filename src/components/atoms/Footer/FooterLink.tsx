import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

export function FooterLink({ children, className, ...other }: LinkProps) {
  return (
    <Link className={twMerge('link link-hover', className)} {...other}>
      {children}
    </Link>
  );
}
