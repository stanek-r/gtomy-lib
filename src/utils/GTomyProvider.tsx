import { gtomyContext, GTomyProviderProps } from '@/utils/GTomyProvider.core';
import { ToastProvider } from '@/organisms/toast/ToastProvider';
import { ReactElement } from 'react';

export function GTomyProvider({ value, children }: GTomyProviderProps): ReactElement {
  return (
    <gtomyContext.Provider value={value}>
      <ToastProvider />
      {children}
    </gtomyContext.Provider>
  );
}
