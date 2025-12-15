import { StoryObj } from '@storybook/react';
import { ErrorState } from '@/components/ErrorState/ErrorState';

export default {
  title: 'Components/ErrorState',
  component: ErrorState,
  argTypes: {
    onClick: { action: 'clicked' },
    disabled: {
      control: {
        type: 'boolean',
      },
    },
  },
};

type Story = StoryObj<typeof ErrorState>;

export const Default: Story = {
  render: () => {
    return (
      <ErrorState
        translation={{
          error: 'Error occured',
          retry: 'Try again',
          badGateway: 'Server unreachable',
          noPermission: "You don't have permission to view this.",
        }}
        error={new Error()}
        showRetry={true}
        refetch={() => console.log('Test')}
      />
    );
  },
};
