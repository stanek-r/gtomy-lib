import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { KeyIcon, XMarkIcon } from '@heroicons/react/20/solid';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};

export const Primary: Story = {
  args: {
    children: 'Button',
    color: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Button',
    color: 'secondary',
  },
};

export const Success: Story = {
  args: {
    children: 'Button',
    color: 'success',
  },
};

export const Error: Story = {
  args: {
    children: 'Button',
    color: 'error',
  },
};

export const Warning: Story = {
  args: {
    children: 'Button',
    color: 'warning',
  },
};

export const Info: Story = {
  args: {
    children: 'Button',
    color: 'info',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Button',
    color: 'ghost',
  },
};

export const Small: Story = {
  args: {
    children: 'Button',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    children: 'Button',
    size: 'lg',
  },
};

export const WithIcons: Story = {
  args: {
    startIcon: KeyIcon,
    children: 'Button',
    endIcon: XMarkIcon,
  },
};
