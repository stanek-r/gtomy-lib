import React from 'react';
import { BaseDialog, BaseDialogProps } from '@/components/organisms/dialog/BaseDialog';
import { Typography, Text } from '@/components/atoms';

export interface InfoDialogProps extends BaseDialogProps {
  title: string;
  text: string;
}

export function InfoDialog({ title, text, ...other }: InfoDialogProps) {
  return (
    <BaseDialog {...other}>
      <Typography size="3xl" color="gray">
        {title}
      </Typography>
      <Text color="gray">{text}</Text>
    </BaseDialog>
  );
}
