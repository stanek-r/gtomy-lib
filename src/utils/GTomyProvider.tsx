import { gtomyContext, GTomyProviderProps } from '@/utils/GTomyProvider.core';

export function GTomyProvider({ value, children }: GTomyProviderProps) {
  return <gtomyContext.Provider value={value}>{children}</gtomyContext.Provider>;
}
