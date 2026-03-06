import { StoryObj } from '@storybook/react';
import { ErrorCard } from '@/components/ErrorCard/ErrorCard';
import { AxiosError } from 'axios';

export default {
  title: 'Components/ErrorCard',
  component: ErrorCard,
  argTypes: {
    onClick: { action: 'clicked' },
    disabled: {
      control: {
        type: 'boolean',
      },
    },
  },
};

type Story = StoryObj<typeof ErrorCard>;

export const Default: Story = {
  render: () => {
    return (
      <ErrorCard
        translation={{
          error: 'Error occured',
          retry: 'Try again',
          badGateway: 'Server unreachable',
          noPermission: "You don't have permission to view this.",
        }}
        error={new Error('Test error message')}
        showRetry={true}
        refetch={() => console.log('Test')}
      />
    );
  },
};

export const Warning: Story = {
  render: () => {
    return (
      <ErrorCard
        translation={{
          error: 'Error occured',
          retry: 'Try again',
          badGateway: 'Server unreachable',
          noPermission: "You don't have permission to view this.",
        }}
        error={new AxiosError('Test error message', undefined, undefined, undefined, { status: 401 } as never)}
        refetch={() => console.log('Test')}
      />
    );
  },
};
