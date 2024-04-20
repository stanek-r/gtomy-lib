import React from 'react';
import { RequirePermission } from './RequirePermission';
import { BrowserRouter } from 'react-router-dom';
import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

const meta: Meta<typeof RequirePermission> = {
  title: 'Auth/RequirePermission',
  component: RequirePermission,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>{Story()}</QueryClientProvider>
      </BrowserRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof RequirePermission>;

export const Default: Story = {};
