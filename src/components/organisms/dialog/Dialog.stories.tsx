import type { Meta, StoryObj } from '@storybook/react';
import {
  useAlertDialog,
  useConfirmationDialog,
  useDialog,
  useImageDialog,
  useInfoDialog,
} from '@/utils/hooks/useDialog';
import * as Dialog from '@radix-ui/react-dialog';
import { ConfirmationDialogOnAction } from '@/components/organisms/dialog/confirmation/ConfirmationDialog';
import { DialogElement } from '@/components/organisms/dialog/DialogElement';
import { Button } from '@/components/atoms/Button/Button';
import { Typography } from '@/components/atoms/Typography/Typography';
import { BaseDialog } from '@/components/organisms/dialog/BaseDialog';

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
        <Dialog.Close asChild>
          <Button>Hello</Button>
        </Dialog.Close>
        <Dialog.Close asChild>
          <Button>there</Button>
        </Dialog.Close>
      </>
    );
    const { openDialog, dialogElementProps } = useDialog(
      <BaseDialog actions={actions} {...args}>
        <Typography size="3xl">Lorem ipsum dolor sit amet</Typography>
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

export const Alert: Story = {
  render: () => {
    const { openDialog, dialogElementProps } = useAlertDialog({
      title: 'Lorem ipsum dolor sit amet',
      text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. In laoreet, magna id viverra tincidunt, sem odio bibendum justo, vel imperdiet sapien wisi sed libero.',
    });

    return (
      <>
        <DialogElement {...dialogElementProps} />
        <Button onClick={openDialog}>Open dialog</Button>
      </>
    );
  },
};

export const Info: Story = {
  render: () => {
    const { openDialog, dialogElementProps } = useInfoDialog({
      title: 'Lorem ipsum dolor sit amet',
      text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. In laoreet, magna id viverra tincidunt, sem odio bibendum justo, vel imperdiet sapien wisi sed libero.',
    });

    return (
      <>
        <DialogElement {...dialogElementProps} />
        <Button onClick={openDialog}>Open dialog</Button>
      </>
    );
  },
};

export const Confirmation: Story = {
  render: () => {
    const onAction: ConfirmationDialogOnAction = ({ onClose }) => {
      console.log('Action');
      onClose();
    };
    const { openDialog, dialogElementProps } = useConfirmationDialog({
      title: 'Lorem ipsum dolor sit amet',
      text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. In laoreet, magna id viverra tincidunt, sem odio bibendum justo, vel imperdiet sapien wisi sed libero.',
      onAction,
    });

    return (
      <>
        <DialogElement {...dialogElementProps} />
        <Button onClick={openDialog}>Open dialog</Button>
      </>
    );
  },
};

export const ImageDialog: Story = {
  render: () => {
    const { openDialog, dialogElementProps } = useImageDialog({
      title: 'Lorem ipsum dolor sit amet',
      subtitle: 'Lorem ipsum dolor sit amet',
      imageId: 'IMAGE_ID',
    });

    return (
      <>
        <DialogElement {...dialogElementProps} />
        <Button onClick={openDialog}>Open dialog</Button>
      </>
    );
  },
};
