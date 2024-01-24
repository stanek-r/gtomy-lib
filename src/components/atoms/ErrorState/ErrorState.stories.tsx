import React from 'react';
import { ComponentStory } from '@storybook/react';
import { ErrorState } from './ErrorState';

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

export const Default: ComponentStory<typeof ErrorState> = () => {
  return <ErrorState error={{ hello: 'bug' }} showRetry={true} retry={() => console.log('Test')} />;
};
