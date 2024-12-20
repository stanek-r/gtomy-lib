import { BaseDialog, BaseDialogProps } from '@/components/organisms/dialog/BaseDialog';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { ReactNode } from 'react';
import { Button } from '@/components/atoms/Button/Button';
import { useTranslation } from 'react-i18next';
import { Typography } from '@/components/atoms/Typography/Typography';

export interface AlertDialogProps extends BaseDialogProps {
  title: string;
  text: ReactNode;
}

export function AlertDialog({ title, text, ...props }: AlertDialogProps) {
  const { t } = useTranslation('common');

  const actions = <Button onClick={() => props.onOpenChange?.(false)}>{t('close')}</Button>;

  return (
    <BaseDialog icon={ExclamationCircleIcon} actions={actions} closable={false} {...props}>
      <Typography size="3xl">{title}</Typography>
      <Typography as="p">{text}</Typography>
    </BaseDialog>
  );
}
