import { create } from 'zustand';
import { FunctionComponent } from 'react';
import { BaseDialogProps } from '@/components/organisms/dialog';

export interface DialogObject {
  id: string;
  open: boolean;
  element: FunctionComponent<BaseDialogProps> | JSX.Element;
}

export interface DialogStore {
  dialogs: DialogObject[];
  setDialogs: (dialogs: JSX.Element[]) => void;
  addDialog: (dialog: JSX.Element) => void;
  setOpened: (id: string, open: boolean) => void;
}

export const useDialogStore = create((set) => ({
  dialogs: [],
  setDialogs: (dialogs: DialogObject[]) => set(() => ({ dialogs: dialogs })),
  addDialog: (dialog: DialogObject) => set((store: DialogStore) => ({ dialogs: [...store.dialogs, dialog] })),
  setOpened: (id: string, open: boolean) =>
    set((store: DialogStore) => ({
      dialogs: store.dialogs.map((dialog) => (dialog.id === id ? { ...dialog, open: open } : dialog)),
    })),
}));
