import React, { ComponentProps } from 'react';

export function FooterSocialAnchor({ children, ...other }: ComponentProps<'a'>) {
  return <a {...other}>{children}</a>;
}
