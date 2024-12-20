import { SentryConfig } from '@/utils/sentry/initSentry';
import { createContext, ReactNode, useContext } from 'react';

export interface GTomyLibInitConfig {
  appName: string;
  appDisplayName: string;
  themes?: string[];
  authUrl?: string;
  backendUrl?: string;
  storageUrl?: string;
  cloudflareConfig?: {
    imagesUrl?: string;
  };
  sentryConfig?: SentryConfig;
  googleConfig?: {
    clientId?: string;
    googleMeasurementId?: string;
  };
  displayCookies?: boolean;
  nextJs?: boolean;
}

export interface GTomyLibConfig {
  appName?: string;
  appDisplayName?: string;
  themes?: string[];
  authUrl?: string;
  backendUrl?: string;
  storageUrl?: string;
  cloudFlareImagesUrl?: string;
  googleAuthClientId?: string;
  navigate?: (url: string) => void;
}

export const ConfigContext = createContext<GTomyLibConfig>({});

export function useConfig(): GTomyLibConfig {
  return useContext(ConfigContext);
}

export interface ConfigProviderProps {
  children?: ReactNode;
  config: GTomyLibInitConfig;
}
