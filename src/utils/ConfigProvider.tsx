import { createContext, ReactNode, useContext, useEffect } from 'react';
import { SentryConfig } from '@/utils/sentry/initSentry';
import { HttpClient } from '@/utils/auth/httpClient';

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
}

export const ConfigContext = createContext<GTomyLibConfig>({});

export function useConfig(): GTomyLibConfig {
  return useContext(ConfigContext);
}

export interface ConfigProviderProps {
  children?: ReactNode;
  config: GTomyLibInitConfig;
}

export function ConfigProvider({ children, config: initConfig }: ConfigProviderProps) {
  const config: GTomyLibConfig = {
    appName: initConfig.appName,
    appDisplayName: initConfig.appDisplayName,
    themes: initConfig.themes && initConfig.themes.length > 1 ? ['system', ...initConfig.themes] : [],
    backendUrl: initConfig.backendUrl,
    authUrl: initConfig.authUrl,
    storageUrl: initConfig.storageUrl,
    cloudFlareImagesUrl: initConfig.cloudflareConfig?.imagesUrl ?? '/images',
    googleAuthClientId: initConfig.googleConfig?.clientId,
  };

  useEffect(() => {
    HttpClient.AUTH_URL = initConfig.authUrl;
  }, [initConfig.authUrl]);

  return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>;
}
