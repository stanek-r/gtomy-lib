import { FunctionComponent, ReactElement, useCallback, useMemo, useState } from 'react';
import { BaseDialogProps } from '@/organisms/dialog/BaseDialog.core';
import { DialogElementProps } from '@/organisms/dialog/DialogElement';

export interface UseDialogReturn {
  openDialog: () => void;
  closeDialog: () => void;
  dialogElementProps: DialogElementProps;
}

export function useDialog(dialog: FunctionComponent<BaseDialogProps> | ReactElement): UseDialogReturn {
  const [open, setOpen] = useState<boolean>(false);

  const onOpenChange = useCallback((_open: boolean) => setOpen(_open), [setOpen]);
  const openDialog = useCallback(() => setOpen(true), [setOpen]);
  const closeDialog = useCallback(() => setOpen(false), [setOpen]);

  const dialogElementProps = useMemo(
    () => ({
      dialog,
      open,
      onOpenChange,
    }),
    [dialog, open, onOpenChange]
  );

  return {
    openDialog,
    closeDialog,
    dialogElementProps,
  };
}
