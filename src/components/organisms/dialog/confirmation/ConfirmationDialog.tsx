import { ReactNode, useState } from 'react';
import { BaseDialog, BaseDialogProps } from '@/components/organisms/dialog';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { ErrorState } from '@/components/atoms/ErrorState';
import { useTranslation } from '@/utils/hooks/useTranslation';

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

  const onError = (error: any) => {
    setError(error);
  };

  const onClose = () => {
    props.onOpenChange?.(false);
  };

  const actions = (
    <>
      <Button color="error" onClick={() => onAction({ onClose, onError })}>
        {confirm ?? t('confirm')}
      </Button>
      <Button onClick={() => props.onOpenChange?.(false)}>{cancel ?? t('cancel')}</Button>
    </>
  );

  return (
    <BaseDialog actions={actions} {...props}>
      <Typography size="3xl">{title}</Typography>
      <Typography as="p">{text}</Typography>
      {error && <ErrorState error={error} />}
    </BaseDialog>
  );
}
