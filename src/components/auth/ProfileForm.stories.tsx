import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import type { Meta, StoryObj } from '@storybook/react';
import { ProfileForm } from '@/components/auth/ProfileForm';

const meta: Meta<typeof ProfileForm> = {
  title: 'Auth/ProfileForm',
  component: ProfileForm,
  decorators: [(Story) => <BrowserRouter>{Story()}</BrowserRouter>],
};

export default meta;
type Story = StoryObj<typeof ProfileForm>;

export const Default: Story = {};
