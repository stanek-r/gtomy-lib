import { useContext } from 'react';
import { gtomyContext } from '@/utils/GTomyProvider/GTomyProvider.core';

export interface GTomyContext {
  cloudFlareImagesUrl?: string;
  storageUrl?: string;
  backendUrl?: string;
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

export function useGTomyContext(): GTomyContext | null {
  return useContext(gtomyContext);
}
