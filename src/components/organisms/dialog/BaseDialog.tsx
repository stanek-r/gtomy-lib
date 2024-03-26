import React, { ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { ButtonIcon } from '@/components/atoms/ButtonIcon';
import { twMerge } from 'tailwind-merge';
import { isSvgIcon, SvgIconType } from '@/models';

export const maxWidthOptions = {
  sm: 'max-w-screen-sm ',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  '2xl': 'max-w-screen-2xl',
};

export interface BaseDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface ExtendedBaseDialogProps extends BaseDialogProps {
  closable?: boolean;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  actions?: ReactNode;
  children?: ReactNode;
  spacing?: boolean;
  icon?: ReactNode | SvgIconType;
}

export function BaseDialog({
  open,
  onOpenChange,
  closable = true,
  maxWidth,
  actions,
  children,
  spacing = true,
  icon,
}: ExtendedBaseDialogProps) {
  const maxWidthClasses = maxWidth ? maxWidthOptions[maxWidth] : maxWidthOptions.md;

  const onOpenChangeHandler = (open: boolean) => {
    if (closable) {
      onOpenChange?.(open);
    }
  };

  if (isSvgIcon(icon)) {
    icon = React.createElement(icon, { className: 'size-8 shrink-0 mt-0.5' });
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChangeHandler}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-25" />
        <Dialog.Content
          className={twMerge(
            'fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] translate-x-[-50%] translate-y-[-50%] rounded-[6px] p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none bg-neutral text-neutral-content',
            maxWidthClasses
          )}
        >
          {icon ? (
            <div className="flex gap-4">
              {icon}
              <div className={twMerge(spacing && 'space-y-4')}>{children}</div>
            </div>
          ) : (
            <div className={twMerge(spacing && 'space-y-4')}>{children}</div>
          )}
          {actions && <div className="flex justify-end gap-x-2 pt-4">{actions}</div>}
          {closable && (
            <Dialog.Close asChild>
              <ButtonIcon
                icon={XMarkIcon}
                variant="circle"
                size="sm"
                color="ghost"
                className="absolute right-[10px] top-[10px]"
              />
            </Dialog.Close>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
