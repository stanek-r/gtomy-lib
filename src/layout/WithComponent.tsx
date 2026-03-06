import { FunctionComponent, memo, ReactElement } from 'react';

export type WithComponentComponent = FunctionComponent | ReactElement;

export interface WithComponentProps {
  Component?: WithComponentComponent;
}

export const WithComponent = memo(({ Component }: WithComponentProps): ReactElement | undefined => {
  if (typeof Component === 'function') {
    return <Component />;
  }
  return Component;
});
