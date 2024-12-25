import { BaseDialog, BaseDialogProps } from '@/components/organisms/dialog/BaseDialog';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { ReactNode } from 'react';
import { Typography } from '@/components/atoms/Typography/Typography';

export interface InfoDialogProps extends BaseDialogProps {
  title: string;
  text: ReactNode;
}

export function InfoDialog({ title, text, ...other }: InfoDialogProps) {
  return (
    <BaseDialog icon={InformationCircleIcon} {...other}>
      <Typography size="3xl">{title}</Typography>
      <Typography as="p">{text}</Typography>
    </BaseDialog>
  );
}
