import type { Meta, StoryObj } from '@storybook/react';
import { showToast } from '@/organisms/toast/showToast';
import { Button } from '@/components/Button/Button';
import { ToastProvider } from '@/organisms/toast/ToastProvider';

const meta: Meta = {
  title: 'Organisms/Toast',
  decorators: [
    (Story) => (
      <>
        <ToastProvider />
        <Story />
      </>
    ),
  ],
};

type Story = StoryObj;

export default meta;
export const Default: Story = {
  render: () => {
    const displayToast = () =>
      showToast({
        message: 'Hello world',
      });

    return <Button onClick={displayToast}>Show toast</Button>;
  },
};
