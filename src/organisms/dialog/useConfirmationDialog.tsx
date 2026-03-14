import { createElement } from 'react';
import { ConfirmationDialog, ConfirmationDialogProps } from '@/organisms/dialog/confirmation/ConfirmationDialog';
import { useDialog } from '@/organisms/dialog/useDialog';

export function useConfirmationDialog(props: Omit<ConfirmationDialogProps, 'open' | 'onOpenChange'>) {
  return useDialog(createElement(ConfirmationDialog, props));
}
