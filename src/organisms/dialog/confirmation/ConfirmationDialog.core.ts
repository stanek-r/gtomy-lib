import { ReactNode } from 'react';
import { BaseDialogProps } from '@/organisms/dialog/BaseDialog.core';

export type ConfirmationDialogOnAction = ({
  onClose,
  onError,
}: {
  onClose: () => void;
  onError: (error: unknown) => void;
}) => Promise<void> | void;

export interface ConfirmationDialogProps extends BaseDialogProps {
  title: string;
  text: ReactNode;
  confirm: string;
  cancel: string;
  onAction: ConfirmationDialogOnAction;
  translation: {
    retry: string;
    error: string;
    noPermission: string;
    badGateway: string;
  };
}
