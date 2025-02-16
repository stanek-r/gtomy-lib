import type { Meta, StoryObj } from '@storybook/react';
import { SelectInput } from '@/components/SelectInput/SelectInput';
import { Option } from '@/components/SelectInput/SelectInput.core';

const meta: Meta<typeof SelectInput> = {
  title: 'Components/SelectInput',
  component: SelectInput,
};

const options: Option[] = [
  {
    value: '1',
    label: 'Option 1',
  },
  {
    value: '2',
    label: 'Option 2',
  },
  {
    value: '3',
    label: 'Option 3',
  },
];

export default meta;
type Story = StoryObj<typeof SelectInput>;

export const Default: Story = {
  args: {
    options: options,
  },
};

export const AllowEmpty: Story = {
  args: {
    options: options,
    allowEmpty: true,
  },
};

export const WithForm: Story = {
  args: {
    label: 'Label',
    hint: 'Hint',
    options: options,
  },
};
