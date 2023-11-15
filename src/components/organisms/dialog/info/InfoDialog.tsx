import React from 'react';
import { BaseDialog, BaseDialogProps } from '../BaseDialog';
import { Typography, Text } from '../../../atoms';

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
