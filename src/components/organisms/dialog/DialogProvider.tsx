import React, { ReactNode } from 'react';
import { useDialog } from '../../../utils/hooks/useDialog';

export interface DialogProviderProps {
  children: ReactNode;
}

export function DialogProvider({ children }: DialogProviderProps) {
  const { dialogs, openDialog, closeDialog } = useDialog();

  const onOpenChange = (id: string, open: boolean) => {
    if (open) {
      openDialog(id);
    } else {
      closeDialog(id);
    }
  };

  return (
    <>
      {dialogs.map((dialog) =>
        React.cloneElement(dialog.element, {
          key: dialog.id,
          id: dialog.id,
          open: dialog.open,
          onOpenChange: (open: boolean) => onOpenChange(dialog.id, open),
        })
      )}
      {children}
    </>
  );
}
