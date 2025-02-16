import type { Meta, StoryObj } from '@storybook/react';
import { GTomyProvider } from '@/utils/GTomyProvider';
import { CloudflareImage } from '@/components/CloudflareImage/CloudflareImage';

const meta: Meta<typeof CloudflareImage> = {
  title: 'Components/CloudflareImage',
  component: CloudflareImage,
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
  args: {
    imageId: '5b46b9fd-8d41-4fbc-987f-3e7fd0e99600',
  },
};

export default meta;
type Story = StoryObj<typeof CloudflareImage>;

export const Default: Story = {};
