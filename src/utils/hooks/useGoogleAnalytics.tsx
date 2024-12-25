import { useLocation } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';

export interface UseGoogleAnalyticsReturn {
  logEvent: (category: string, action: string, label?: string) => void;
}
export function useGoogleAnalytics(): UseGoogleAnalyticsReturn {
  const [gaPlugin, setGaPlugin] = useState<any>(null);

  useEffect(() => {
    import('react-ga4')
      .then((plugin) => {
        setGaPlugin(plugin);
      })
      .catch((e) => console.error(e));
  }, []);

  const logEvent = useCallback(
    (category: string, action: string, label?: string) => {
      if (gaPlugin == null) {
        return;
      }
      gaPlugin.default.event({
        category: category,
        action: action,
        label: label,
      });
    },
    [gaPlugin]
  );

  return {
    logEvent,
  };
}

export function useGoogleAnalyticsPageLoad() {
  const { pathname, search } = useLocation();
  const [gaPlugin, setGaPlugin] = useState<any>(null);

  useEffect(() => {
    import('react-ga4')
      .then((plugin) => {
        setGaPlugin(plugin);
      })
      .catch((e) => console.error(e));
  }, []);

  useEffect(() => {
    if (gaPlugin == null) {
      return;
    }
    gaPlugin.default.send({
      hitType: 'pageview',
      page: pathname + search,
      title: pathname,
    });
  }, [pathname, search, gaPlugin]);
}
