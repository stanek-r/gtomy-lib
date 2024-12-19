import { BrowserRouter } from 'react-router-dom';
import { CloudflareStream } from '@/components/atoms/CloudflareStream/CloudflareStream';
import { StoryObj } from '@storybook/react';
import { Breakpoint } from '@/utils/hooks/useBreakpoint';

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

type Story = StoryObj<typeof CloudflareStream>;

export const Default: Story = {
  render: (args) => {
    return <CloudflareStream {...args} />;
  },
};
