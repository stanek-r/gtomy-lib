import { cloneElement, createElement, FunctionComponent } from 'react';
import { BaseDialogProps } from '@/components/organisms/dialog/BaseDialog';

export interface DialogElementProps {
  dialog: FunctionComponent<BaseDialogProps> | JSX.Element;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DialogElement({ dialog, open, onOpenChange }: DialogElementProps): JSX.Element {
  const props = {
    open,
    onOpenChange,
  };
  if (typeof dialog === 'function') {
    return createElement(dialog, props);
  }
  return cloneElement(dialog, props);
}
