import React, { ReactNode, useMemo } from 'react';
import { useDialog } from '@/utils/hooks/useDialog';
import { DialogObject } from '@/utils/hooks/storage';

export interface DialogProviderProps {
  children: ReactNode;
}

export function DialogProvider({ children }: DialogProviderProps): JSX.Element {
  const { dialogs, openDialog, closeDialog } = useDialog();

  const flattenedDialogs = useMemo(() => {
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
      {flattenedDialogs.map((dialog) =>
        typeof dialog.element === 'function'
          ? React.createElement(dialog.element, {
              key: dialog.id,
              id: dialog.id,
              open: dialog.open,
              onOpenChange: (open: boolean) => onOpenChange(dialog.id, open),
            })
          : React.cloneElement(dialog.element, {
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
