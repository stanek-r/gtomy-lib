import React from 'react';
import { RequirePermission } from './RequirePermission';
import { BrowserRouter } from 'react-router-dom';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof RequirePermission> = {
  title: 'Auth/RequirePermission',
  component: RequirePermission,
  decorators: [(Story) => <BrowserRouter>{Story()}</BrowserRouter>],
};

export default meta;
type Story = StoryObj<typeof RequirePermission>;

export const Default: Story = {};
