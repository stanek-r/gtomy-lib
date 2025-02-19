import { useCallback, useState } from 'react';
import { ConfirmationDialogProps } from '@/organisms/dialog/confirmation/ConfirmationDialog.core';
import { BaseDialog } from '@/organisms/dialog/BaseDialog';
import { Button } from '@/components/Button/Button';
import { Typography } from '@/components/Typography/Typography';
import { ErrorState } from '@/components/ErrorState/ErrorState';

export function ConfirmationDialog({ text, title, onAction, confirm, cancel, ...props }: ConfirmationDialogProps) {
  const [error, setError] = useState<unknown>();
  const { onOpenChange } = props;

  const onClose = useCallback(() => {
    onOpenChange?.(false);
  }, [onOpenChange]);

  return (
    <BaseDialog
      actions={
        <>
          <Button color="error" onClick={() => onAction({ onClose, onError: setError })}>
            {confirm}
          </Button>
          <Button onClick={() => onOpenChange?.(false)}>{cancel}</Button>
        </>
      }
      {...props}
    >
      <Typography size="3xl">{title}</Typography>
      <Typography as="p">{text}</Typography>
      {error != null && <ErrorState error={error} />}
    </BaseDialog>
  );
}
