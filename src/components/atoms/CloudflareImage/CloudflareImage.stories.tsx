import type { Meta, StoryObj } from '@storybook/react';
import { CloudflareImage } from '@/components/atoms/CloudflareImage/CloudflareImage';
import { BrowserRouter } from 'react-router-dom';
import { config } from '@/config';

config.cloudFlareImagesUrl = 'https://gtomy.net/images';

const meta: Meta<typeof CloudflareImage> = {
  title: 'Atoms/CloudflareImage',
  component: CloudflareImage,
  decorators: [(Story: any) => <BrowserRouter>{Story()}</BrowserRouter>],
  args: {
    imageId: '5b46b9fd-8d41-4fbc-987f-3e7fd0e99600',
  },
};

export default meta;
type Story = StoryObj<typeof CloudflareImage>;

export const Default: Story = {};
