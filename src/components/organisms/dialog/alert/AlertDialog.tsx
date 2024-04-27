import { BaseDialog, BaseDialogProps } from '@/components/organisms/dialog/BaseDialog';
import { Button } from '@/components/atoms/Button';
import { Typography } from '@/components/atoms/Typography';
import { useTranslation } from '@/utils/hooks/useTranslation';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { ReactNode } from 'react';

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
