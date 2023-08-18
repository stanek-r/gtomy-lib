import React, { ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { ButtonIcon } from '../../atoms';
import classNames from 'classnames';

export const maxWidthOptions = {
  sm: 'max-w-screen-sm ',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  '2xl': 'max-w-screen-2xl',
};

export interface BaseDialogProps {
  id?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface ExtendedBaseDialogProps extends BaseDialogProps {
  closable?: boolean;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  actions?: ReactNode;
  children?: ReactNode;
}

export function BaseDialog({
  open,
  onOpenChange,
  closable = true,
  maxWidth,
  actions,
  children,
}: ExtendedBaseDialogProps) {
  const maxWidthClasses = maxWidth ? maxWidthOptions[maxWidth] : maxWidthOptions.md;

  const onOpenChangeHandler = (open: boolean) => {
    if (closable) {
      onOpenChange?.(open);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChangeHandler}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black opacity-25 fixed inset-0" />
        <Dialog.Content
          className={classNames(
            'fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none text-base-300',
            maxWidthClasses
          )}
        >
          {children}
          {actions && <div className="flex justify-end gap-x-2">{actions}</div>}
          {closable && (
            <Dialog.Close asChild>
              <ButtonIcon icon={XMarkIcon} size="sm" color="ghost" className="absolute top-[10px] right-[10px]" />
            </Dialog.Close>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
