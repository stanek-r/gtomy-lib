import React from 'react';
import { RegisterForm } from './RegisterForm';
import { BrowserRouter } from 'react-router-dom';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof RegisterForm> = {
  title: 'Auth/RegisterForm',
  component: RegisterForm,
  decorators: [(Story) => <BrowserRouter>{Story()}</BrowserRouter>],
};

export default meta;
type Story = StoryObj<typeof RegisterForm>;

export const Default: Story = {};
