import { cloneElement, createElement, FunctionComponent, ReactElement } from 'react';
import { BaseDialogProps } from '@/organisms/dialog/BaseDialog.core';

export interface DialogElementProps {
  dialog: FunctionComponent<BaseDialogProps> | ReactElement;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DialogElement({ dialog, open, onOpenChange }: DialogElementProps): ReactElement {
  const props = {
    open,
    onOpenChange,
  };
  if (typeof dialog === 'function') {
    return createElement(dialog, props);
  }
  return cloneElement(dialog, props);
}
