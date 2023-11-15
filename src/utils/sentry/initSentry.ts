import * as Sentry from '@sentry/react';

let sentryEnabled = false;

export interface SentryConfig {
  enabled: boolean;
  dsn: string;
  additionalTracePropagationTargets: string[];
  environment: string;
  release: string;
}

export function initSentry(config: SentryConfig) {
  Sentry.init({
    dsn: config.dsn,
    integrations: [
      new Sentry.BrowserTracing({
        // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
        tracePropagationTargets: [
          'https://gtomy.net/',
          'https://auth.gtomy.net/',
          ...config.additionalTracePropagationTargets,
        ],
      }),
      new Sentry.Replay(),
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
    // Session Replay
    replaysSessionSampleRate: 0, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
    release: config.release,
    environment: config.environment,
  });
  sentryEnabled = true;
}

/**
 * Returns whether Sentry is enabled or not.
 */
export function isSentryEnabled(): boolean {
  return sentryEnabled;
}
