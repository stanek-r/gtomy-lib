import React, { FunctionComponent, useCallback, useState } from 'react';
import { BaseDialogProps } from '@/components/organisms/dialog';
import { DialogElement } from '@/components/organisms/dialog/DialogElement';
import { InfoDialog, InfoDialogProps } from '@/components/organisms/dialog/info';
import { AlertDialog, AlertDialogProps } from '@/components/organisms/dialog/alert';
import {
  ConfirmationDialog,
  ConfirmationDialogProps,
} from '@/components/organisms/dialog/confirmation/ConfirmationDialog';
import { ImageDialog, ImageDialogProps } from '@/components/organisms/dialog/image/ImageDialog';

export type DialogElementType = FunctionComponent;

export interface UseDialogReturn {
  openDialog: () => void;
  closeDialog: () => void;
  DialogElement: DialogElementType;
}

export function useDialog(dialog: FunctionComponent<BaseDialogProps> | JSX.Element): UseDialogReturn {
  const [open, setOpen] = useState<boolean>(false);

  const DialogElementInner = useCallback(
    () => <DialogElement dialog={dialog} open={open} onOpenChange={(_open: boolean) => setOpen(_open)} />,
    [dialog, open, setOpen]
  );

  return {
    openDialog: () => setOpen(true),
    closeDialog: () => setOpen(false),
    DialogElement: DialogElementInner,
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
