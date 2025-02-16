import type { Meta, StoryObj } from '@storybook/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Icon } from '@/components/Icon/Icon';

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Small: Story = {
  args: {
    icon: XMarkIcon,
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    icon: XMarkIcon,
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    icon: XMarkIcon,
    size: 'lg',
  },
};

export const ExtraLarge: Story = {
  args: {
    icon: XMarkIcon,
    size: 'xl',
  },
};

export const ExtraExtraLarge: Story = {
  args: {
    icon: XMarkIcon,
    size: '2xl',
  },
};

export const Color: Story = {
  args: {
    icon: XMarkIcon,
    size: 'xl',
    color: 'accent',
    content: false,
  },
};
