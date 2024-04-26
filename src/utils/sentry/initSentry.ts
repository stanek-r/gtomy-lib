const ignoredStatusCodes: number[] = [401, 403];
let sentryPlugin: any = null;

export interface SentryConfig {
  enabled: boolean;
  dsn: string;
  additionalTracePropagationTargets: string[];
  environment: string;
  release: string;
  ignoredStatusCodes?: number[];
}

export function initSentry(config: SentryConfig, tracePropagationTargets: string[] = []) {
  if (config.ignoredStatusCodes) {
    ignoredStatusCodes.push(...config.ignoredStatusCodes);
  }
  import('@sentry/react')
    .then((plugin) => {
      plugin.init({
        dsn: config.dsn,
        tracePropagationTargets: [...tracePropagationTargets, ...config.additionalTracePropagationTargets],
        integrations: [plugin.browserTracingIntegration(), plugin.replayIntegration()],
        // Performance Monitoring
        tracesSampleRate: 1.0,
        // Session Replay
        replaysSessionSampleRate: 0,
        replaysOnErrorSampleRate: 1.0,
        release: config.release,
        environment: config.environment,
      });
      sentryPlugin = plugin;
    })
    .catch((e) => console.error(e));
}

/**
 * Returns whether Sentry is enabled or not.
 */
export function isSentryEnabled(): boolean {
  return sentryPlugin != null;
}

/**
 * Returns the ignored status codes.
 */
export function getIgnoredStatusCodes(): number[] {
  return ignoredStatusCodes;
}

export function getSentryPlugin(): any {
  return sentryPlugin;
}
