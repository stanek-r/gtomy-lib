import React from 'react';
import { RegisterPage } from './RegisterPage';
import { BrowserRouter } from 'react-router-dom';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof RegisterPage> = {
  title: 'RegisterPage',
  component: RegisterPage,
  decorators: [(Story) => <BrowserRouter>{Story()}</BrowserRouter>],
};

export default meta;
type Story = StoryObj<typeof RegisterPage>;

export const Default: Story = {};
