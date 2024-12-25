import { FunctionComponent, ReactNode, useMemo } from 'react';
import { ToastProvider } from '@/components/organisms/toast/ToastProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useGoogleAnalyticsPageLoad } from '@/utils/hooks/useGoogleAnalytics';
import { CookiesProvider } from '@/components/organisms/cookies/CookiesProvider';
import { LayoutProvider } from '@/components/layout/LayoutProvider';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/utils/i18n';
import { ConfigProviderVite } from '@/utils/config/ConfigProviderVite';
import { GTomyLibInitConfig } from '@/utils/config/context';
import { ConfigProviderNextJs } from '@/utils/config/ConfigProviderNextJs';

const defaultQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

export interface GTomyProvider {
  config: GTomyLibInitConfig;
  MenuComponent?: FunctionComponent | JSX.Element;
  FooterComponent?: FunctionComponent | JSX.Element;
  queryClient?: QueryClient;
  children?: ReactNode;
}

export function GTomyProvider({
  children,
  MenuComponent,
  FooterComponent,
  queryClient = defaultQueryClient,
  config,
}: GTomyProvider) {
  const ConfigProvider = useMemo(() => (config.nextJs ? ConfigProviderNextJs : ConfigProviderVite), [config]);

  return (
    <I18nextProvider i18n={i18n}>
      <ConfigProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <LayoutProvider MenuComponent={MenuComponent} FooterComponent={FooterComponent}>
            <ToastProvider />
            {config.displayCookies && <CookiesProvider />}
            {children}
          </LayoutProvider>
        </QueryClientProvider>
      </ConfigProvider>
    </I18nextProvider>
  );
}

export function GoogleAnalyticsProvider() {
  useGoogleAnalyticsPageLoad();
  return null;
}
