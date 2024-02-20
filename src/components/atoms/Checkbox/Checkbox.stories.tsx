import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';
import { config } from '@/config';

const meta: Meta<typeof Checkbox> = {
  title: 'Atoms/Inputs/Checkbox',
  component: Checkbox,
};

config.cloudFlareImagesUrl = 'https://gtomy.net/images';

export default meta;
type Story = StoryObj<typeof Checkbox>;

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

export const WithImage: Story = {
  args: {
    label: 'Label',
    hint: 'Hint',
    imageId: '5b46b9fd-8d41-4fbc-987f-3e7fd0e99600',
  },
  render: (args) => (
    <div className="w-52">
      <Checkbox {...args} />
    </div>
  ),
};
