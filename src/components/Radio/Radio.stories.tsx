import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from '@/components/Radio/Radio';
import { GTomyProvider } from '@/utils/GTomyProvider/GTomyProvider';

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  args: {
    name: 'radio-1',
  },
  decorators: [
    (Story) => (
      <GTomyProvider
        value={{
          cloudFlareImagesUrl: 'https://gtomy.net/images',
        }}
      >
        <Story />
      </GTomyProvider>
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
