import { CONFIG, Config } from '@/utils/config';

export function initGTomyLib(config: Config) {
  Object.assign(CONFIG, config);
}
