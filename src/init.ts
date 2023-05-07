import { config, GTomyLibConfig } from './config';

export function initGTomyLib(initConfig: GTomyLibConfig): void {
  Object.assign(config, initConfig);
}
