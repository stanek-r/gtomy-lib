import type { Meta, StoryObj } from '@storybook/react';
import { config } from '@/config';
import { Radio } from './Radio';

const meta: Meta<typeof Radio> = {
  title: 'Atoms/Inputs/Radio',
  component: Radio,
  args: {
    name: 'radio-1',
  },
};

config.cloudFlareImagesUrl = 'https://gtomy.net/images';

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {};

export const WithForm: Story = {
  args: {
    label: 'Label',
    hint: 'Hint',
  },
};

export const WithFormError: Story = {
  args: {
    label: 'Label',
    hint: 'Hint',
    error: 'Error',
  },
};
