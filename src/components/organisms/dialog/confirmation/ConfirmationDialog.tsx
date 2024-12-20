import { ReactNode, useCallback, useState } from 'react';
import { BaseDialog, BaseDialogProps } from '@/components/organisms/dialog/BaseDialog';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/atoms/Button/Button';
import { Typography } from '@/components/atoms/Typography/Typography';
import { ErrorState } from '@/components/atoms/ErrorState/ErrorState';

export type ConfirmationDialogOnAction = ({
  onClose,
  onError,
}: {
  onClose: () => void;
  onError: (error: any) => void;
}) => void;

export interface ConfirmationDialogProps extends BaseDialogProps {
  title: string;
  text: ReactNode;
  confirm?: string;
  cancel?: string;
  onAction: ConfirmationDialogOnAction;
}

export function ConfirmationDialog({ text, title, onAction, confirm, cancel, ...props }: ConfirmationDialogProps) {
  const { t } = useTranslation('common');
  const [error, setError] = useState<any>();
  const { onOpenChange } = props;

  const onClose = useCallback(() => {
    onOpenChange?.(false);
  }, [onOpenChange]);

  return (
    <BaseDialog
      actions={
        <>
          <Button color="error" onClick={() => onAction({ onClose, onError: setError })}>
            {confirm ?? t('confirm')}
          </Button>
          <Button onClick={() => onOpenChange?.(false)}>{cancel ?? t('cancel')}</Button>
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
