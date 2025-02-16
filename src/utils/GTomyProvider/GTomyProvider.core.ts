import { createContext, PropsWithChildren } from 'react';
import { GTomyContext } from '@/utils/GTomyProvider/useGTomyContext';

export const gtomyContext = createContext<GTomyContext | null>(null);

export interface GTomyProviderProps extends PropsWithChildren {
  value: GTomyContext | null;
}
