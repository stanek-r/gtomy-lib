import React from 'react';

export type SvgIconType = React.ForwardRefExoticComponent<
  React.SVGProps<SVGSVGElement> & { title?: string; titleId?: string }
>;

export function isSvgIcon(icon: any): icon is SvgIconType {
  return icon && icon.$$typeof === Symbol.for('react.forward_ref');
}
