import { config } from './config';
import { Applications } from './utils/applications';
import { initSentry, SentryConfig } from './utils';

interface GTomyLibInitConfig {
  appName: string;
  sentryConfig?: SentryConfig;
}

export function initGTomyLib(initConfig: GTomyLibInitConfig): void {
  Object.assign(config, {
    application: Applications.getByName(initConfig.appName),
  });

  if (initConfig.sentryConfig?.enabled) {
    initSentry(initConfig.sentryConfig);
  }
}
