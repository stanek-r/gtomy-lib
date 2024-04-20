import { ForwardRefExoticComponent, SVGProps } from 'react';

export type SvgIconType = ForwardRefExoticComponent<SVGProps<SVGSVGElement> & { title?: string; titleId?: string }>;

export function isSvgIcon(icon: any): icon is SvgIconType {
  return icon && icon.$$typeof === Symbol.for('react.forward_ref');
}
