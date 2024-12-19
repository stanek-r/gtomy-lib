import { FunctionComponent, ReactNode } from 'react';
import { ToastProvider } from '@/components/organisms/toast/ToastProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useGoogleAnalyticsPageLoad } from '@/utils/hooks/useGoogleAnalytics';
import { CookiesProvider } from '@/components/organisms/cookies/CookiesProvider';
import { LayoutProvider } from '@/components/layout/LayoutProvider';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/utils/i18n';
import { ConfigProvider, GTomyLibInitConfig } from '@/utils/ConfigProvider';

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
  config: { displayCookies, ...config },
}: GTomyProvider) {
  return (
    <I18nextProvider i18n={i18n}>
      <ConfigProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <LayoutProvider MenuComponent={MenuComponent} FooterComponent={FooterComponent}>
            <ToastProvider />
            {displayCookies && <CookiesProvider />}
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
