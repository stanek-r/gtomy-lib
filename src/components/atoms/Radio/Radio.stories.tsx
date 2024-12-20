import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from './Radio';
import { ConfigProviderVite } from '@/utils/config/ConfigProviderVite';

const meta: Meta<typeof Radio> = {
  title: 'Atoms/Inputs/Radio',
  component: Radio,
  args: {
    name: 'radio-1',
  },
  decorators: [
    (Story: any) => (
      <ConfigProviderVite
        config={{
          appName: '',
          appDisplayName: '',
          cloudflareConfig: { imagesUrl: 'https://gtomy.net/images' },
        }}
      >
        {Story()}
      </ConfigProviderVite>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {};

export const WithForm: Story = {
  args: {
    name: 'radio-2',
    label: 'Label',
    hint: 'Hint',
  },
};

export const WithFormError: Story = {
  args: {
    name: 'radio-3',
    label: 'Label',
    hint: 'Hint',
    error: 'Error',
  },
};
