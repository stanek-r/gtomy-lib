import React, { FunctionComponent } from 'react';
import { ToastProvider } from '@/components/organisms/toast/ToastProvider';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LayoutProvider } from '@/components/layout';
import { ScrollToTop } from '@/components/organisms/ScrollToTop';
import { useGoogleAnalyticsPageLoad } from '@/utils/hooks/useGoogleAnalytics';

const defaultQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
      staleTime: 30 * 1000,
    },
  },
});

export interface GTomyProvider {
  children: JSX.Element | JSX.Element[];
  routerBasename?: string;
  MenuComponent?: FunctionComponent | JSX.Element;
  FooterComponent?: FunctionComponent | JSX.Element;
  queryClient?: QueryClient;
}

export function GTomyProvider({
  children,
  routerBasename,
  MenuComponent,
  FooterComponent,
  queryClient = defaultQueryClient,
}: GTomyProvider) {
  return (
    <BrowserRouter basename={routerBasename}>
      <ScrollToTop />
      <QueryClientProvider client={queryClient}>
        <LayoutProvider MenuComponent={MenuComponent} FooterComponent={FooterComponent}>
          <ToastProvider />
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
