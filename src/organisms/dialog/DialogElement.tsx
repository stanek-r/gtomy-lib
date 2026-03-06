import { cloneElement, createElement, FunctionComponent, memo, ReactElement, useMemo } from 'react';
import { BaseDialogProps } from '@/organisms/dialog/BaseDialog.core';

export interface DialogElementProps {
  dialog: FunctionComponent<BaseDialogProps> | ReactElement;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DialogElement = memo(({ dialog, open, onOpenChange }: DialogElementProps) => {
  const props = useMemo(() => ({ onOpenChange }), [onOpenChange]);

  if (!open) {
    return null;
  }

  if (typeof dialog === 'function') {
    return createElement(dialog, props);
  }

  return cloneElement(dialog, props);
});
