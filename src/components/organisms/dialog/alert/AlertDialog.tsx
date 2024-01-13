import React from 'react';
import { BaseDialog, BaseDialogProps } from '@/components/organisms/dialog/BaseDialog';
import { Button } from '@/components/atoms/Button';
import { Text, Typography } from '@/components/atoms/Typography';
import { useDialog } from '@/utils/hooks/useDialog';
import { useTranslation } from '@/utils/hooks/useTranslation';

export interface AlertDialogProps extends BaseDialogProps {
  title: string;
  text: string;
}

export function AlertDialog({ id, title, text, ...other }: AlertDialogProps) {
  const { t } = useTranslation('common');
  const { closeDialog } = useDialog();

  const actions = <Button onClick={() => id && closeDialog(id)}>{t('close')}</Button>;

  return (
    <BaseDialog id={id} actions={actions} closable={false} {...other}>
      <Typography size="3xl" color="gray">
        {title}
      </Typography>
      <Text color="gray">{text}</Text>
    </BaseDialog>
  );
}
