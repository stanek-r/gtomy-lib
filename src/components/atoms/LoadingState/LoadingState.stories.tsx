import React from 'react';
import { ComponentStory } from '@storybook/react';
import { LoadingState } from './LoadingState';

export default {
  title: 'Atoms/LoadingState',
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
  return <LoadingState showLoading={true} />;
};

export const Spinner: ComponentStory<typeof LoadingState> = () => {
  return <LoadingState showLoading={true} variant="spinner" />;
};

export const Ball: ComponentStory<typeof LoadingState> = () => {
  return <LoadingState showLoading={true} variant="ball" />;
};

export const Dots: ComponentStory<typeof LoadingState> = () => {
  return <LoadingState showLoading={true} variant="dots" />;
};

export const Bars: ComponentStory<typeof LoadingState> = () => {
  return <LoadingState showLoading={true} variant="bars" />;
};

export const Ring: ComponentStory<typeof LoadingState> = () => {
  return <LoadingState showLoading={true} variant="ring" />;
};

export const Infinite: ComponentStory<typeof LoadingState> = () => {
  return <LoadingState showLoading={true} variant="infinity" />;
};
