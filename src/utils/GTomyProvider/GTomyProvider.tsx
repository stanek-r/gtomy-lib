import { ToastProvider } from '@/organisms/toast/ToastProvider';
import { ReactElement } from 'react';
import { gtomyContext, GTomyProviderProps } from '@/utils/GTomyProvider/GTomyProvider.core';

export function GTomyProvider({ value, children }: GTomyProviderProps): ReactElement {
  return (
    <gtomyContext.Provider value={value}>
      <ToastProvider />
      {children}
    </gtomyContext.Provider>
  );
}
