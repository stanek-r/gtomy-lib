import { createElement } from 'react';
import { ConfirmationDialog } from '@/organisms/dialog/confirmation/ConfirmationDialog';
import { ConfirmationDialogProps } from '@/organisms/dialog/confirmation/ConfirmationDialog.core';
import { useDialog } from '@/organisms/dialog/useDialog';

export function useConfirmationDialog(props: Omit<ConfirmationDialogProps, 'open' | 'onOpenChange'>) {
  return useDialog(createElement(ConfirmationDialog, props));
}
