import { ReactNode } from 'react';
import { BaseDialogProps } from '@/organisms/BaseDialog.core';

export type ConfirmationDialogOnAction = ({
  onClose,
  onError,
}: {
  onClose: () => void;
  onError: (error: Error) => void;
}) => void;

export interface ConfirmationDialogProps extends BaseDialogProps {
  title: string;
  text: ReactNode;
  confirm?: string;
  cancel?: string;
  onAction: ConfirmationDialogOnAction;
}
