import React from 'react';
import { LoginButton } from './LoginButton';
import { BrowserRouter } from 'react-router-dom';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof LoginButton> = {
  title: 'Auth/LoginButton',
  component: LoginButton,
  decorators: [(Story) => <BrowserRouter>{Story()}</BrowserRouter>],
};

export default meta;
type Story = StoryObj<typeof LoginButton>;

export const Default: Story = {};
