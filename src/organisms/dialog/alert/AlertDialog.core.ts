import { ReactNode } from 'react';
import { BaseDialogProps } from '@/organisms/BaseDialog.core';

export interface AlertDialogProps extends BaseDialogProps {
  title: string;
  text: ReactNode;
}
