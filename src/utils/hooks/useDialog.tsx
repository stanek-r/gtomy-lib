import { DialogObject, useDialogStore } from '@/utils/hooks/storage';
import { useEffect } from 'react';

export interface UseDialogReturn {
  dialogs: DialogObject[];
  openDialog: (id: string) => void;
  closeDialog: (id: string) => void;
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

  useEffect(() => {
    if (dialog != null) {
      createDialog(dialog);
    }
  }, []);

  const openDialog = (id: string) => setOpened(id, true);
  const closeDialog = (id: string) => setOpened(id, false);
  const createDialog = (newDialog: DialogObjectWithoutOpen) => {
    addDialog({
      ...newDialog,
      open: false,
    });
  };
  const clearDialogs = () => setDialogs([]);

  return { dialogs, openDialog, closeDialog, createDialog, clearDialogs };
}
