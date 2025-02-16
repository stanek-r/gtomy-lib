import { ForwardRefExoticComponent, SVGProps } from 'react';

export type SvgIconType = ForwardRefExoticComponent<SVGProps<SVGSVGElement> & { title?: string; titleId?: string }>;

// @ts-expect-error: Ignore any in order to check icon type
export function isSvgIcon(icon): icon is SvgIconType {
  return icon && icon.$$typeof === Symbol.for('react.forward_ref');
}
