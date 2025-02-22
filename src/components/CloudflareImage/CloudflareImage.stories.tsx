import type { Meta, StoryObj } from '@storybook/react';
import { CloudflareImage } from '@/components/CloudflareImage/CloudflareImage';

const meta: Meta<typeof CloudflareImage> = {
  title: 'Components/CloudflareImage',
  component: CloudflareImage,
  args: {
    imagesUrl: 'https://gtomy.net/images',
    imageId: '5b46b9fd-8d41-4fbc-987f-3e7fd0e99600',
  },
};

export default meta;
type Story = StoryObj<typeof CloudflareImage>;

export const Default: Story = {};
