import { ReactNode, useCallback, useMemo, useState } from 'react';
import { BaseDialog } from '@/organisms/dialog/BaseDialog';
import { Button } from '@/components/Button/Button';
import { Typography } from '@/components/Typography/Typography';
import { ErrorState } from '@/components/ErrorState/ErrorState';
import { BaseDialogProps } from '@/organisms/dialog/BaseDialog.core';
import { ErrorTranslations } from '@/types/translations';
import { CONFIG } from '@/utils/config';

export type ConfirmationDialogOnAction = ({
  onClose,
  onError,
}: {
  onClose: () => void;
  onError: (error: unknown) => void;
}) => Promise<void> | void;

export interface ConfirmationDialogProps extends BaseDialogProps {
  title: string;
  text: ReactNode;
  confirm: string;
  cancel: string;
  onAction: ConfirmationDialogOnAction;
  translation?: ErrorTranslations;
}

export function ConfirmationDialog({
  text,
  title,
  onAction,
  confirm,
  cancel,
  translation,
  onOpenChange,
  ...props
}: ConfirmationDialogProps) {
  const [error, setError] = useState<unknown>();

  const mergedTranslations = useMemo(() => translation ?? CONFIG.errorTranslations, [translation]);

  const onClose = useCallback(() => onOpenChange?.(false), [onOpenChange]);

  return (
    <BaseDialog
      actions={
        <>
          <Button color="error" onClick={() => onAction({ onClose, onError: setError })}>
            {confirm}
          </Button>
          <Button onClick={onClose}>{cancel}</Button>
        </>
      }
      onOpenChange={onOpenChange}
      title={title}
      {...props}
    >
      <Typography size="3xl">{title}</Typography>
      <Typography as="p">{text}</Typography>
      {error != null && <ErrorState error={error} translation={mergedTranslations} />}
    </BaseDialog>
  );
}
