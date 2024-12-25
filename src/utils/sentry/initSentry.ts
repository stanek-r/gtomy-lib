import { BrowserClientReplayOptions } from '@sentry/types/build/types/browseroptions';

let sentryPlugin: any = null;

export interface SentryConfig {
  enabled: boolean;
  dsn: string;
  additionalTracePropagationTargets: string[];
  environment: string;
  release: string;
  sampleRate?: number;
  tracesSampleRate?: number;
  sentryReplay?: BrowserClientReplayOptions;
}

export function initSentry(config: SentryConfig, tracePropagationTargets: string[] = []) {
  import('@sentry/react')
    .then((plugin) => {
      plugin.init({
        dsn: config.dsn,
        tracePropagationTargets: [...tracePropagationTargets, ...config.additionalTracePropagationTargets],
        integrations: [
          plugin.browserTracingIntegration(),
          ...(config.sentryReplay ? [plugin.replayIntegration()] : []),
        ],
        ...(config.sampleRate ? { sampleRate: config.sampleRate } : {}),
        // Performance Monitoring
        ...(config.tracesSampleRate ? { tracesSampleRate: config.tracesSampleRate } : { autoSessionTracking: false }),
        // Session Replay
        ...(config.sentryReplay ? config.sentryReplay : {}),
        // Release information
        release: config.release,
        environment: config.environment,
      });
      sentryPlugin = plugin;
    })
    .catch((e) => console.error(e));
}

export function isSentryEnabled(): boolean {
  return sentryPlugin != null;
}

export function getSentryPlugin(): any {
  return sentryPlugin;
}
