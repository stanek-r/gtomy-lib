import { DialogObject, useDialogStore } from '@/utils/hooks/storage';
import { useEffect, useState } from 'react';

export interface UseDialogReturn {
  dialogs: DialogObject[];
  openDialog: (id?: string) => void;
  closeDialog: (id?: string) => void;
  createDialog: (dialog: DialogObjectWithoutOpen) => void;
  clearDialogs: () => void;
}

type DialogObjectWithoutOpen = Omit<DialogObject, 'open'>;

export function useDialog(dialog?: DialogObjectWithoutOpen): UseDialogReturn {
  const [dialogs, setDialogs, addDialog, setOpened] = useDialogStore((state: any) => [
    state.dialogs,
    state.setDialogs,
    state.addDialog,
    state.setOpened,
  ]);
  const [controlledId, setControlledId] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (dialog) {
      createDialog(dialog);
      setControlledId(dialog.id);
    }
  }, []);

  const openDialog = (id?: string) => setOpened(id ?? controlledId, true);
  const closeDialog = (id?: string) => setOpened(id ?? controlledId, false);
  const createDialog = (newDialog: DialogObjectWithoutOpen) => {
    if (dialogs.find((d: DialogObject) => d.id === newDialog.id)) {
      return;
    }
    addDialog({
      ...newDialog,
      open: false,
    });
  };
  const clearDialogs = () => setDialogs([]);

  return { dialogs, openDialog, closeDialog, createDialog, clearDialogs };
}
