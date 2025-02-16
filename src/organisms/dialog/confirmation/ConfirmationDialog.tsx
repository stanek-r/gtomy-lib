import { useCallback, useState } from 'react';
import { ConfirmationDialogProps } from '@/organisms/dialog/confirmation/ConfirmationDialog.core';
import { BaseDialog } from '@/organisms/dialog/BaseDialog';
import { Button } from '@/components/Button/Button';
import { Typography } from '@/components/Typography/Typography';
import { ErrorState } from '@/components/ErrorState/ErrorState';
import { useGTomyContext } from '@/utils/GTomyProvider/useGTomyContext';

export function ConfirmationDialog({ text, title, onAction, confirm, cancel, ...props }: ConfirmationDialogProps) {
  const gtomyContext = useGTomyContext();
  const [error, setError] = useState<Error | null>();
  const { onOpenChange } = props;

  const onClose = useCallback(() => {
    onOpenChange?.(false);
  }, [onOpenChange]);

  return (
    <BaseDialog
      actions={
        <>
          <Button color="error" onClick={() => onAction({ onClose, onError: setError })}>
            {confirm ?? gtomyContext?.translation?.confirm}
          </Button>
          <Button onClick={() => onOpenChange?.(false)}>{cancel ?? gtomyContext?.translation?.cancel}</Button>
        </>
      }
      {...props}
    >
      <Typography size="3xl">{title}</Typography>
      <Typography as="p">{text}</Typography>
      {error && <ErrorState error={error} />}
    </BaseDialog>
  );
}
