import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { AlertDialogProps } from '@/organisms/dialog/alert/AlertDialog.core';
import { Button } from '@/components/Button/Button';
import { BaseDialog } from '@/organisms/dialog/BaseDialog';
import { Typography } from '@/components/Typography/Typography';
import * as Dialog from '@radix-ui/react-dialog';

export function AlertDialog({ title, text, close, ...props }: AlertDialogProps) {
  return (
    <BaseDialog
      title={title}
      icon={ExclamationCircleIcon}
      actions={<Button onClick={() => props.onOpenChange?.(false)}>{close}</Button>}
      closable={false}
      {...props}
    >
      <Typography as={Dialog.Title} size="3xl">
        {title}
      </Typography>
      <Typography as="p">{text}</Typography>
    </BaseDialog>
  );
}
