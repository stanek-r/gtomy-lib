import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from './Radio';
import { ConfigProvider } from '@/utils/ConfigProvider';

const meta: Meta<typeof Radio> = {
  title: 'Atoms/Inputs/Radio',
  component: Radio,
  args: {
    name: 'radio-1',
  },
  decorators: [
    (Story: any) => (
      <ConfigProvider
        config={{ appName: '', appDisplayName: '', cloudflareConfig: { imagesUrl: 'https://gtomy.net/images' } }}
      >
        {Story()}
      </ConfigProvider>
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
