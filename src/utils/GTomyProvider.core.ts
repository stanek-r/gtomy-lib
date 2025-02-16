import { createContext, PropsWithChildren, useContext } from 'react';

export interface GTomyContext {
  cloudFlareImagesUrl?: string;
  translation?: {
    close?: string;
    confirm?: string;
    cancel?: string;
    retry?: string;
    error?: string;
    loading?: string;
    noPermission?: string;
    badGateway?: string;
  };
}

export const gtomyContext = createContext<GTomyContext | null>(null);

export function useGTomyContext(): GTomyContext | null {
  return useContext(gtomyContext);
}

export interface GTomyProviderProps extends PropsWithChildren {
  value: GTomyContext | null;
}
