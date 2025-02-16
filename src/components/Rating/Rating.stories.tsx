import type { Meta, StoryObj } from '@storybook/react';
import { Rating } from '@/components/Rating/Rating';

const meta: Meta<typeof Rating> = {
  title: 'Components/Rating',
  component: Rating,
  args: {
    name: 'rating-1',
    amount: 10,
  },
};

export default meta;
type Story = StoryObj<typeof Rating>;

export const Default: Story = {};

export const Half: Story = {
  args: {
    name: 'rating-2',
    half: true,
  },
};

export const WithForm: Story = {
  args: {
    name: 'rating-3',
    label: 'Label',
    hint: 'Hint',
  },
};

export const WithFormError: Story = {
  args: {
    name: 'rating-4',
    label: 'Label',
    hint: 'Hint',
    error: 'Error',
  },
};
