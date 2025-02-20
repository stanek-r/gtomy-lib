import { ReactElement } from 'react';
import { WithComponentProps } from '@/layout/WithComponent.core';

export function WithComponent({ Component }: WithComponentProps): ReactElement | undefined {
  if (typeof Component === 'function') {
    return <Component />;
  }
  return Component;
}
