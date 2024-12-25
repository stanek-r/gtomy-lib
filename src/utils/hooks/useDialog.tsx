import { FunctionComponent, useCallback, useMemo, useState } from 'react';
import {
  ConfirmationDialog,
  ConfirmationDialogProps,
} from '@/components/organisms/dialog/confirmation/ConfirmationDialog';
import { ImageDialog, ImageDialogProps } from '@/components/organisms/dialog/image/ImageDialog';
import { DialogElementProps } from '@/components/organisms/dialog/DialogElement';
import { BaseDialogProps } from '@/components/organisms/dialog/BaseDialog';
import { InfoDialog, InfoDialogProps } from '@/components/organisms/dialog/info/InfoDialog';
import { AlertDialog, AlertDialogProps } from '@/components/organisms/dialog/alert/AlertDialog';

export type DialogElementType = FunctionComponent;

export interface UseDialogReturn {
  openDialog: () => void;
  closeDialog: () => void;
  dialogElementProps: DialogElementProps;
}

export function useDialog(dialog: FunctionComponent<BaseDialogProps> | JSX.Element): UseDialogReturn {
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

export function useInfoDialog(props: Omit<InfoDialogProps, 'open' | 'onOpenChange'>): UseDialogReturn {
  return useDialog(<InfoDialog {...props} />);
}

export function useAlertDialog(props: Omit<AlertDialogProps, 'open' | 'onOpenChange'>): UseDialogReturn {
  return useDialog(<AlertDialog {...props} />);
}

export function useConfirmationDialog(props: Omit<ConfirmationDialogProps, 'open' | 'onOpenChange'>): UseDialogReturn {
  return useDialog(<ConfirmationDialog {...props} />);
}

export function useImageDialog(props: Omit<ImageDialogProps, 'open' | 'onOpenChange'>): UseDialogReturn {
  return useDialog(<ImageDialog {...props} />);
}
