import React from 'react';
import type { ComponentStory, Meta } from '@storybook/react';
import { useDialog } from '@/utils/hooks/useDialog';
import { Button } from '@/components/atoms/Button';
import { Typography } from '@/components/atoms/Typography';
import { BaseDialog } from './BaseDialog';
import { DialogProvider } from './DialogProvider';
import * as Dialog from '@radix-ui/react-dialog';
import { AlertDialog } from './alert/AlertDialog';
import { InfoDialog } from './info/InfoDialog';

const meta: Meta<typeof BaseDialog> = {
  title: 'Organisms/Dialog',
  component: BaseDialog,
};

export default meta;
export const Default: ComponentStory<typeof BaseDialog> = (args) => {
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
  const { openDialog } = useDialog({
    id: 'test-base',
    element: (
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
    ),
  });

  return (
    <DialogProvider>
      <Button onClick={() => openDialog('test-base')}>Open dialog</Button>
    </DialogProvider>
  );
};

export const Alert: ComponentStory<typeof BaseDialog> = () => {
  const { openDialog } = useDialog({
    id: 'test-alert',
    element: (
      <AlertDialog
        title="Lorem ipsum dolor sit amet"
        text="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. In laoreet, magna id viverra tincidunt, sem odio bibendum justo, vel imperdiet sapien wisi sed libero."
      />
    ),
  });

  return (
    <DialogProvider>
      <Button onClick={() => openDialog('test-alert')}>Open dialog</Button>
    </DialogProvider>
  );
};

export const Info: ComponentStory<typeof BaseDialog> = () => {
  const { openDialog } = useDialog({
    id: 'test-info',
    element: (
      <InfoDialog
        title="Lorem ipsum dolor sit amet"
        text="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. In laoreet, magna id viverra tincidunt, sem odio bibendum justo, vel imperdiet sapien wisi sed libero."
      />
    ),
  });

  return (
    <DialogProvider>
      <Button onClick={() => openDialog('test-info')}>Open dialog</Button>
    </DialogProvider>
  );
};
