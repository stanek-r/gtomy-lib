import type { Meta, StoryObj } from '@storybook/react';
import { TextInput } from '@/components/TextInput/TextInput';

const meta: Meta<typeof TextInput> = {
  title: 'Components/TextInput',
  component: TextInput,
};

export default meta;
type Story = StoryObj<typeof TextInput>;

export const Default: Story = {
  args: {
    placeholder: 'TextInput',
  },
};

export const WithForm: Story = {
  args: {
    placeholder: 'TextInput',
    label: 'Label',
    hint: 'Hint',
  },
};

export const WithFormError: Story = {
  args: {
    placeholder: 'TextInput',
    label: 'Label',
    hint: 'Hint',
    error: 'Error',
  },
};
