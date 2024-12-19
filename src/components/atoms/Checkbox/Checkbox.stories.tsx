import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';
import { ConfigProvider } from '@/utils/ConfigProvider';

const meta: Meta<typeof Checkbox> = {
  title: 'Atoms/Inputs/Checkbox',
  component: Checkbox,
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
