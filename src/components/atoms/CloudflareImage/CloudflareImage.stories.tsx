import { BrowserRouter } from 'react-router-dom';
import { CloudflareImage } from '@/components/atoms/CloudflareImage/CloudflareImage';
import { ComponentStory } from '@storybook/react';
import { config } from '@/config';

export default {
  title: 'Atoms/CloudflareImage',
  component: CloudflareImage,
  decorators: [(Story: any) => <BrowserRouter>{Story()}</BrowserRouter>],
  args: {
    imageId: '5b46b9fd-8d41-4fbc-987f-3e7fd0e99600',
  },
};

config.cloudFlareImagesUrl = 'https://gtomy.net/images';

export const Default: ComponentStory<typeof CloudflareImage> = (args) => {
  return <CloudflareImage {...args} />;
};
