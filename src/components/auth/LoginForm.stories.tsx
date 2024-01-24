import React from 'react';
import { LoginForm } from './LoginForm';
import { BrowserRouter } from 'react-router-dom';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof LoginForm> = {
  title: 'Auth/LoginForm',
  component: LoginForm,
  decorators: [(Story) => <BrowserRouter>{Story()}</BrowserRouter>],
};

export default meta;
type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {};
