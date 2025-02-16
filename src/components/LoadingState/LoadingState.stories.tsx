import { StoryObj } from '@storybook/react';
import { LoadingState } from '@/components/LoadingState/LoadingState';

export default {
  title: 'Components/LoadingState',
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

type Story = StoryObj<typeof LoadingState>;

export const Default: Story = {
  render: () => {
    return <LoadingState showLoading={true} />;
  },
};

export const Spinner: Story = {
  render: () => {
    return <LoadingState showLoading={true} variant="spinner" />;
  },
};

export const Ball: Story = {
  render: () => {
    return <LoadingState showLoading={true} variant="ball" />;
  },
};

export const Dots: Story = {
  render: () => {
    return <LoadingState showLoading={true} variant="dots" />;
  },
};

export const Bars: Story = {
  render: () => {
    return <LoadingState showLoading={true} variant="bars" />;
  },
};

export const Ring: Story = {
  render: () => {
    return <LoadingState showLoading={true} variant="ring" />;
  },
};

export const Infinite: Story = {
  render: () => {
    return <LoadingState showLoading={true} variant="infinity" />;
  },
};
