import { ErrorState } from './ErrorState';
import { StoryObj } from '@storybook/react';

export default {
  title: 'Atoms/ErrorState',
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
    return <ErrorState error={{ hello: 'bug' }} showRetry={true} retry={() => console.log('Test')} />;
  },
};
