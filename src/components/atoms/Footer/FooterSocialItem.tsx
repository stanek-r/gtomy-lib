import React, { ComponentProps } from 'react';

export function FooterSocialItem({ children, ...other }: ComponentProps<'a'>) {
  return <a {...other}>{children}</a>;
}
