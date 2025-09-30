import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { BaseDialog } from '@/organisms/dialog/BaseDialog';
import { Typography } from '@/components/Typography/Typography';
import { InfoDialogProps } from '@/organisms/dialog/info/InfoDIalog.core';
import * as Dialog from '@radix-ui/react-dialog';

export function InfoDialog({ title, text, ...other }: InfoDialogProps) {
  return (
    <BaseDialog title={title} icon={InformationCircleIcon} {...other}>
      <Typography as={Dialog.Title} size="3xl">
        {title}
      </Typography>
      <Typography as="p">{text}</Typography>
    </BaseDialog>
  );
}
