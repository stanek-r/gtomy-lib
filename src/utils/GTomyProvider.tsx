import { FunctionComponent } from 'react';
import { ToastProvider } from '@/components/organisms/toast/ToastProvider';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ScrollToTop } from '@/components/organisms/ScrollToTop';
import { useGoogleAnalyticsPageLoad } from '@/utils/hooks/useGoogleAnalytics';
import { LayoutProvider } from '@/components/layout';
import { CookiesProvider } from '@/components/organisms/cookies/CookiesProvider';

const defaultQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
      staleTime: 10 * 1000,
    },
  },
});

export interface GTomyProvider {
  children: JSX.Element | JSX.Element[];
  routerBasename?: string;
  MenuComponent?: FunctionComponent | JSX.Element;
  FooterComponent?: FunctionComponent | JSX.Element;
  queryClient?: QueryClient;
  displayCookies?: boolean;
}

export function GTomyProvider({
  children,
  routerBasename,
  MenuComponent,
  FooterComponent,
  queryClient = defaultQueryClient,
  displayCookies,
}: GTomyProvider) {
  return (
    <BrowserRouter basename={routerBasename}>
      <ScrollToTop />
      <QueryClientProvider client={queryClient}>
        <LayoutProvider MenuComponent={MenuComponent} FooterComponent={FooterComponent}>
          <ToastProvider />
          {displayCookies && <CookiesProvider />}
          {children}
        </LayoutProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export function GoogleAnalyticsProvider() {
  useGoogleAnalyticsPageLoad();
  return null;
}
