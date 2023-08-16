import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from './Typography';

const meta: Meta<typeof Typography> = {
  title: 'Atoms/Typography',
  component: Typography,
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Default: Story = {
  args: {
    children: 'Hello World!',
  },
};

export const Text: Story = {
  args: {
    as: 'p',
    color: 'white',
    size: 'base',
    children: 'Hello World!',
  },
};

export const Error: Story = {
  args: {
    as: 'p',
    color: 'red',
    children: 'Hello World!',
  },
};

export const Heading1: Story = {
  args: {
    as: 'h1',
    color: 'white',
    size: '4xl',
    children: 'Hello World!',
  },
};

export const Heading2: Story = {
  args: {
    as: 'h2',
    color: 'white',
    size: '3xl',
    children: 'Hello World!',
  },
};
