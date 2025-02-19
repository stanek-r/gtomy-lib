import { BaseDialogProps } from '@/organisms/BaseDialog.core';
import { ReactNode } from 'react';

export interface InfoDialogProps extends BaseDialogProps {
  title: string;
  text: ReactNode;
}
