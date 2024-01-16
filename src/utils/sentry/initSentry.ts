import * as Sentry from '@sentry/react';

let sentryEnabled = false;
const ignoredStatusCodes: number[] = [401, 403];

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
  Sentry.init({
    dsn: config.dsn,
    integrations: [
      new Sentry.BrowserTracing({
        tracePropagationTargets: [...tracePropagationTargets, ...config.additionalTracePropagationTargets],
      }),
      new Sentry.Replay(),
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0,
    // Session Replay
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: 1.0,
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

/**
 * Returns the ignored status codes.
 */
export function getIgnoredStatusCodes(): number[] {
  return ignoredStatusCodes;
}
