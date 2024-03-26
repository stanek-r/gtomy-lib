import React from 'react';
import { BaseDialog, BaseDialogProps } from '@/components/organisms/dialog/BaseDialog';
import { Typography } from '@/components/atoms/Typography';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

export interface InfoDialogProps extends BaseDialogProps {
  title: string;
  text: string;
}

export function InfoDialog({ title, text, ...other }: InfoDialogProps) {
  return (
    <BaseDialog icon={InformationCircleIcon} {...other}>
      <Typography size="3xl">{title}</Typography>
      <Typography as="p">{text}</Typography>
    </BaseDialog>
  );
}
