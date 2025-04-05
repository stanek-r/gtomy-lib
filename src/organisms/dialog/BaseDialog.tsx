import * as Dialog from '@radix-ui/react-dialog';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { twJoin } from 'tailwind-merge';
import { ExtendedBaseDialogProps, maxWidthOptions } from '@/organisms/dialog/BaseDialog.core';
import { Icon } from '@/components/Icon/Icon';
import { ButtonIcon } from '@/components/ButtonIcon/ButtonIcon';
import { useCallback } from 'react';

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

  const onOpenChangeHandler = useCallback(
    (open: boolean) => {
      if (closable) {
        onOpenChange?.(open);
      }
    },
    [onOpenChange, closable]
  );

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChangeHandler}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-20 bg-black opacity-25" />
        <Dialog.Content
          aria-describedby={undefined}
          className={twJoin(
            'fixed top-1/2 left-1/2 max-h-[85dvh] w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-[6px] p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none bg-neutral text-neutral-content overflow-y-auto z-30',
            maxWidthClasses
          )}
        >
          {icon ? (
            <div className="flex gap-4">
              <Icon icon={icon} size="xl" />
              <div className={twJoin(spacing && 'space-y-4')}>{children}</div>
            </div>
          ) : (
            <div className={twJoin(spacing && 'space-y-4')}>{children}</div>
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
