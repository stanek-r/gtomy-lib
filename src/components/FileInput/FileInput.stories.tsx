import type { Meta, StoryObj } from '@storybook/react';
import { FileInput } from '@/components/FileInput/FileInput';

const meta: Meta<typeof FileInput> = {
  title: 'Components/FileInput',
  component: FileInput,
};

export default meta;
type Story = StoryObj<typeof FileInput>;

export const Default: Story = {
  args: {
    placeholder: 'FileInput',
  },
};

export const WithForm: Story = {
  args: {
    placeholder: 'TextInput',
    label: 'Label',
    hint: 'Hint',
  },
};

export const Small: Story = {
  args: {
    placeholder: 'FileInput',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    placeholder: 'FileInput',
    size: 'lg',
  },
};
