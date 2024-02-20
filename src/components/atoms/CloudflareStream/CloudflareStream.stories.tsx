import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ComponentStory } from '@storybook/react';
import { CloudflareStream } from '@/components/atoms/CloudflareStream/CloudflareStream';
import { Breakpoint } from '@/utils';

export default {
  title: 'Atoms/CloudflareStream',
  component: CloudflareStream,
  decorators: [(Story: any) => <BrowserRouter>{Story()}</BrowserRouter>],
  args: {
    videoId: '386ef526a1db216ae714fc073f0bcf17',
    settings: {
      sizes: [
        {
          breakpoint: 'xs',
          size: (breakpoint: Breakpoint, width: number) => width - 2 * 16,
        },
        {
          breakpoint: 'sm',
          size: (breakpoint: Breakpoint, width: number) => width - 2 * 16,
        },
      ],
      aspectRatio: [16, 9],
    },
  },
};

export const Default: ComponentStory<typeof CloudflareStream> = (args) => {
  return <CloudflareStream {...args} />;
};
