import React from 'react';
import { ComponentStory } from '@storybook/react';
import { LoadingState } from './LoadingState';

export default {
  title: 'Molecules/States/LoadingState',
  component: LoadingState,
  argTypes: {
    onClick: { action: 'clicked' },
    disabled: {
      control: {
        type: 'boolean',
      },
    },
  },
};

export const Default: ComponentStory<typeof LoadingState> = () => {
  return <LoadingState />;
};
