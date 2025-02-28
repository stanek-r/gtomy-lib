import type { Meta, StoryObj } from '@storybook/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ButtonIcon } from '@/components/ButtonIcon/ButtonIcon';

const meta: Meta<typeof ButtonIcon> = {
  title: 'Components/ButtonIcon',
  component: ButtonIcon,
};

export default meta;
type Story = StoryObj<typeof ButtonIcon>;

export const Default: Story = {
  args: {
    icon: XMarkIcon,
  },
};

export const Circle: Story = {
  args: {
    icon: XMarkIcon,
    variant: 'circle',
  },
};

export const Primary: Story = {
  args: {
    icon: XMarkIcon,
    color: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    icon: XMarkIcon,
    color: 'secondary',
  },
};

export const Success: Story = {
  args: {
    icon: XMarkIcon,
    color: 'success',
  },
};

export const Error: Story = {
  args: {
    icon: XMarkIcon,
    color: 'error',
  },
};

export const Warning: Story = {
  args: {
    icon: XMarkIcon,
    color: 'warning',
  },
};

export const Info: Story = {
  args: {
    icon: XMarkIcon,
    color: 'info',
  },
};

export const Ghost: Story = {
  args: {
    icon: XMarkIcon,
    color: 'ghost',
  },
};
