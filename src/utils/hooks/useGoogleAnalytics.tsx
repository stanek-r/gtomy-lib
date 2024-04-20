import { useEffect } from 'react';
import { config } from '@/config';
import ReactGA from 'react-ga4';

export interface UseGoogleAnalyticsReturn {
  logEvent: (category: string, action: string, label?: string) => void;
}

export function useGoogleAnalytics(): UseGoogleAnalyticsReturn {
  const logEvent = (category: string, action: string, label?: string) => {
    if (!config.googleAnalyticsEnabled) {
      return;
    }
    ReactGA.event({
      category: category,
      action: action,
      label: label,
    });
  };

  return {
    logEvent,
  };
}

export function useGoogleAnalyticsPageLoad() {
  useEffect(() => {
    if (!config.googleAnalyticsEnabled) {
      return;
    }
    ReactGA.send({
      hitType: 'pageview',
      page: window.location.pathname + window.location.search,
      title: window.location.pathname,
    });
  }, [window.location.pathname, window.location.search]);
}
