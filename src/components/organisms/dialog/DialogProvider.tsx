import React, { ReactNode, useMemo } from 'react';
import { useDialog } from '@/utils/hooks/useDialog';
import { DialogObject } from '@/utils';

export interface DialogProviderProps {
  children: ReactNode;
}

export function DialogProvider({ children }: DialogProviderProps) {
  const { dialogs, openDialog, closeDialog } = useDialog();

  const flattenedDialog = useMemo(() => {
    const ret: DialogObject[] = [];
    for (const dialog of dialogs) {
      const dialogIndex = ret.findIndex((d) => d.id === dialog.id);
      if (dialogIndex === -1) {
        ret.push(dialog);
      } else {
        ret[dialogIndex] = dialog;
      }
    }
    return ret;
  }, [dialogs]);

  const onOpenChange = (id: string, open: boolean) => {
    if (open) {
      openDialog(id);
    } else {
      closeDialog(id);
    }
  };

  return (
    <>
      {flattenedDialog.map((dialog) =>
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
