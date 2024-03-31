import React from 'react';
import { RequirePermission } from './RequirePermission';
import { BrowserRouter } from 'react-router-dom';
import type { Meta, StoryObj } from '@storybook/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { defaultQueryClient } from '@/utils/hooks/query';

const meta: Meta<typeof RequirePermission> = {
  title: 'Auth/RequirePermission',
  component: RequirePermission,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <QueryClientProvider client={defaultQueryClient}>{Story()}</QueryClientProvider>
      </BrowserRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof RequirePermission>;

export const Default: Story = {};
