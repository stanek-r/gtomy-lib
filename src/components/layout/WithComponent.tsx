import { FunctionComponent } from 'react';

export interface WithComponentProps {
  Component?: FunctionComponent | JSX.Element;
}

export function WithComponent({ Component }: WithComponentProps): JSX.Element | undefined {
  if (typeof Component === 'function') {
    return <Component />;
  }
  return Component;
}
