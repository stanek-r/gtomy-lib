import type { Meta, StoryObj } from '@storybook/react';
import { Option, SelectInput } from './SelectInput';

const meta: Meta<typeof SelectInput> = {
  title: 'Atoms/SelectInput',
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
    placeholder: 'SelectInput',
    options: options,
  },
};

export const AllowEmpty: Story = {
  args: {
    placeholder: 'SelectInput',
    options: options,
    allowEmpty: true,
  },
};

export const WithForm: Story = {
  args: {
    placeholder: 'SelectInput',
    label: 'Label',
    hint: 'Hint',
    options: options,
  },
};
