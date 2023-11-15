import type { Meta, StoryObj } from '@storybook/react';
import { TextareaInput } from './TextareaInput';

const meta: Meta<typeof TextareaInput> = {
  title: 'Atoms/Inputs/TextareaInput',
  component: TextareaInput,
};

export default meta;
type Story = StoryObj<typeof TextareaInput>;

export const Default: Story = {
  args: {
    placeholder: 'TextareaInput',
  },
};

export const Resizable: Story = {
  args: {
    placeholder: 'TextareaInput',
    resizable: true,
  },
};

export const WithForm: Story = {
  args: {
    placeholder: 'TextareaInput',
    label: 'Label',
    hint: 'Hint',
    rows: 10,
  },
};
