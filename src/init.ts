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
    authUrl: initConfig.authUrl,
  });

  if (initConfig.sentryConfig?.enabled) {
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
