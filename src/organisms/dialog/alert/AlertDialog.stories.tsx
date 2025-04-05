import type { Meta, StoryObj } from '@storybook/react';
import { DialogElement } from '@/organisms/dialog/DialogElement';
import { Button } from '@/components/Button/Button';
import { useDialog } from '@/organisms/dialog/useDialog';
import { AlertDialog } from '@/organisms/dialog/alert/AlertDialog';

const meta: Meta<typeof AlertDialog> = {
  title: 'Organisms/Dialog/Alert',
  component: AlertDialog,
  args: {
    title: 'Dialog title',
    text: 'Dialog text content',
    close: 'Close button title',
  },
};

type Story = StoryObj<typeof AlertDialog>;

export default meta;
export const Default: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { openDialog, dialogElementProps } = useDialog(<AlertDialog {...args} />);

    return (
      <>
        <DialogElement {...dialogElementProps} />
        <Button onClick={openDialog}>Open dialog</Button>
      </>
    );
  },
};
