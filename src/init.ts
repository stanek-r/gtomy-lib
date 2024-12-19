import { config, GTomyLibConfig } from './config';
import { initSentry, SentryConfig } from '@/utils/sentry/initSentry';

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
  storageUrl?: string;
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
    storageUrl: initConfig.storageUrl,
    cloudFlareImagesUrl: initConfig.cloudflareConfig?.imagesUrl ?? '/images',
    googleAuthClientId: initConfig.googleConfig?.clientId,
    googleAnalyticsPlugin: null,
  } as GTomyLibConfig);

  if (initConfig.googleConfig?.googleMeasurementId != null) {
    import('react-ga4')
      .then((plugin) => {
        plugin.default.initialize(initConfig.googleConfig!.googleMeasurementId!);
        config.googleAnalyticsPlugin = plugin;
      })
      .catch((e) => console.error(e));
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
