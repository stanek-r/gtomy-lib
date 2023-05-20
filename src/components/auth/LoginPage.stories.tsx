import React from 'react';
import { LoginPage } from './LoginPage';
import { BrowserRouter } from 'react-router-dom';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof LoginPage> = {
  title: 'Auth/LoginPage',
  component: LoginPage,
  decorators: [(Story) => <BrowserRouter>{Story()}</BrowserRouter>],
};

export default meta;
type Story = StoryObj<typeof LoginPage>;

export const Default: Story = {};
