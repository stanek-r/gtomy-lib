import type { Meta, StoryObj } from '@storybook/react';
import * as Dialog from '@radix-ui/react-dialog';
import { DialogElement } from '@/organisms/dialog/DialogElement';
import { BaseDialog } from '@/organisms/dialog/BaseDialog';
import { Button } from '@/components/Button/Button';
import { Typography } from '@/components/Typography/Typography';
import { useDialog } from '@/organisms/dialog/useDialog';

const meta: Meta<typeof BaseDialog> = {
  title: 'Organisms/Dialog',
  component: BaseDialog,
};

type Story = StoryObj<typeof BaseDialog>;

export default meta;
export const Default: Story = {
  render: (args) => {
    const actions = (
      <>
        <Button as={Dialog.Close}>Hello</Button>
        <Button as={Dialog.Close}>there</Button>
      </>
    );
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { openDialog, dialogElementProps } = useDialog(
      <BaseDialog actions={actions} {...args}>
        <Typography as={Dialog.Title} size="3xl">
          Lorem ipsum dolor sit amet
        </Typography>
        <Typography as="p">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. In laoreet, magna id viverra tincidunt, sem odio
          bibendum justo, vel imperdiet sapien wisi sed libero. Nullam sapien sem, ornare ac, nonummy non, lobortis a
          enim. Mauris suscipit, ligula sit amet pharetra semper, nibh ante cursus purus, vel sagittis velit mauris vel
          metus. Quisque tincidunt scelerisque libero. Aliquam in lorem sit amet leo accumsan lacinia. Maecenas
          sollicitudin. Donec ipsum massa, ullamcorper in, auctor et, scelerisque sed, est. Nulla non lectus sed nisl
          molestie malesuada. Sed convallis magna eu sem. Mauris dolor felis, sagittis at, luctus sed, aliquam non,
          tellus. Curabitur vitae diam non enim vestibulum interdum.{' '}
        </Typography>
      </BaseDialog>
    );

    return (
      <>
        <DialogElement {...dialogElementProps} />
        <Button onClick={openDialog}>Open dialog</Button>
      </>
    );
  },
};
