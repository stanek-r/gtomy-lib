import { create } from 'zustand';

export interface DialogObject {
  id: string;
  open: boolean;
  element: JSX.Element;
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
  addDialog: (dialog: DialogObject) =>
    set((store: DialogStore) => ({
      dialogs: [...store.dialogs.filter((d) => d.id !== dialog.id), dialog],
    })),
  setOpened: (id: string, open: boolean) =>
    set((store: DialogStore) => ({
      dialogs: store.dialogs.map((dialog) => (dialog.id === id ? { ...dialog, open: open } : dialog)),
    })),
}));
