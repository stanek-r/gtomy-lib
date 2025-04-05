import type { Meta, StoryObj } from '@storybook/react';
import { DialogElement } from '@/organisms/dialog/DialogElement';
import { InfoDialog } from '@/organisms/dialog/info/InfoDialog';
import { Button } from '@/components/Button/Button';
import { useDialog } from '@/organisms/dialog/useDialog';

const meta: Meta<typeof InfoDialog> = {
  title: 'Organisms/Dialog/Info',
  component: InfoDialog,
  args: {
    title: 'Dialog title',
    text: 'Dialog text content',
  },
};

type Story = StoryObj<typeof InfoDialog>;

export default meta;
export const Default: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { openDialog, dialogElementProps } = useDialog(<InfoDialog {...args} />);

    return (
      <>
        <DialogElement {...dialogElementProps} />
        <Button onClick={openDialog}>Open dialog</Button>
      </>
    );
  },
};
