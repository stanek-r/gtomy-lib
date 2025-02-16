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
    return <ErrorState error={new Error()} showRetry={true} retry={() => console.log('Test')} />;
  },
};
