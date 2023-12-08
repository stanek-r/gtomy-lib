import { config } from './config';
import { initSentry, SentryConfig } from './utils';

interface GTomyLibInitConfig {
  appName: string;
  authUrl?: string;
  backendUrl?: string;
  sentryConfig?: SentryConfig;
}

export function initGTomyLib(initConfig: GTomyLibInitConfig): void {
  Object.assign(config, {
    appName: initConfig.appName,
    backendUrl: initConfig.backendUrl,
  });

  if (initConfig.sentryConfig?.enabled) {
    initSentry(initConfig.sentryConfig, initConfig.authUrl, initConfig.backendUrl);
  }
}
