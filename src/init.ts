import { config } from './config';
import { Applications } from './utils/applications';

interface GTomyLibInitConfig {
  appName: string;
}

export function initGTomyLib(initConfig: GTomyLibInitConfig): void {
  Object.assign(config, {
    application: Applications.getByName(initConfig.appName),
  });
}
