import { config } from './config';
import { initSentry, SentryConfig } from '@/utils/sentry';
import ReactGA from 'react-ga4';

interface CloudflareConfig {
  imagesUrl?: string;
}

interface GoogleConfig {
  clientId?: string;
  googleMeasurementId?: string;
}

interface GTomyLibInitConfig {
  appName: string;
  appDisplayName: string;
  themes?: string[];
  authUrl?: string;
  backendUrl?: string;
  cloudflareConfig?: CloudflareConfig;
  sentryConfig?: SentryConfig;
  googleConfig?: GoogleConfig;
}

export function initGTomyLib(initConfig: GTomyLibInitConfig): void {
  Object.assign(config, {
    appName: initConfig.appName,
    appDisplayName: initConfig.appDisplayName,
    themes: initConfig.themes && initConfig.themes.length > 1 ? ['system', ...initConfig.themes] : [],
    backendUrl: initConfig.backendUrl,
    authUrl: initConfig.authUrl,
    cloudFlareImagesUrl: initConfig.cloudflareConfig?.imagesUrl ?? '/images',
    googleAuthClientId: initConfig.googleConfig?.clientId,
    googleAnalyticsPlugin: initConfig.googleConfig?.googleMeasurementId != null,
  });

  if (initConfig.googleConfig?.googleMeasurementId != null) {
    ReactGA.initialize(initConfig.googleConfig.googleMeasurementId);
  }

  if (initConfig.sentryConfig?.enabled === true) {
    const tracePropagationTargets: string[] = [];
    if (initConfig.authUrl) {
      tracePropagationTargets.push(initConfig.authUrl);
    }
    if (initConfig.backendUrl) {
      tracePropagationTargets.push(initConfig.backendUrl);
    }
    initSentry(initConfig.sentryConfig, tracePropagationTargets);
  }
}
