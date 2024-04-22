import { config } from '@/config';
import ReactGA from 'react-ga4';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

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
  const { pathname, search } = useLocation();

  useEffect(() => {
    if (!config.googleAnalyticsEnabled) {
      return;
    }
    ReactGA.send({
      hitType: 'pageview',
      page: pathname + search,
      title: pathname,
    });
  }, [pathname, search]);
}
