import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Atoms/Inputs/Checkbox',
  component: Checkbox,
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

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
