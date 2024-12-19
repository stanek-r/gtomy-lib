import { FunctionComponent } from 'react';
import { ToastProvider } from '@/components/organisms/toast/ToastProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useGoogleAnalyticsPageLoad } from '@/utils/hooks/useGoogleAnalytics';
import { CookiesProvider } from '@/components/organisms/cookies/CookiesProvider';
import { ScrollToTop } from '@/components/organisms/ScrollToTop/ScrollToTop';
import { LayoutProvider } from '@/components/layout/LayoutProvider';

const defaultQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

export interface GTomyProvider {
  children: JSX.Element | JSX.Element[];
  MenuComponent?: FunctionComponent | JSX.Element;
  FooterComponent?: FunctionComponent | JSX.Element;
  queryClient?: QueryClient;
  displayCookies?: boolean;
}

export function GTomyProvider({
  children,
  MenuComponent,
  FooterComponent,
  queryClient = defaultQueryClient,
  displayCookies,
}: GTomyProvider) {
  return (
    <>
      <ScrollToTop />
      <QueryClientProvider client={queryClient}>
        <LayoutProvider MenuComponent={MenuComponent} FooterComponent={FooterComponent}>
          <ToastProvider />
          {displayCookies && <CookiesProvider />}
          {children}
        </LayoutProvider>
      </QueryClientProvider>
    </>
  );
}

export function GoogleAnalyticsProvider() {
  useGoogleAnalyticsPageLoad();
  return null;
}
