import * as Dialog from '@radix-ui/react-dialog';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { twJoin } from 'tailwind-merge';
import { useCallback } from 'react';
import { ExtendedBaseDialogProps } from '@/organisms/dialog/BaseDialog.core';
import { Icon } from '@/components/Icon/Icon';
import { ButtonIcon } from '@/components/ButtonIcon/ButtonIcon';

export function FullScreenDialog({
  onOpenChange,
  closable = true,
  actions,
  children,
  spacing = true,
  icon,
  title,
}: ExtendedBaseDialogProps) {
  const onOpenChangeHandler = useCallback(
    (open: boolean) => {
      if (closable) {
        onOpenChange?.(open);
      }
    },
    [onOpenChange, closable]
  );

  return (
    <Dialog.Root open={true} onOpenChange={onOpenChangeHandler}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-20 bg-neutral opacity-99 h-lvh" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed top-1.5 bottom-1.5 left-0 w-screen p-4 md:p-6 focus:outline-none bg-neutral text-neutral-content overflow-y-auto z-30"
        >
          <Dialog.Title className="hidden">{title}</Dialog.Title>
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
            <ButtonIcon
              as={Dialog.Close}
              icon={XMarkIcon}
              variant="circle"
              size="lg"
              color="ghost"
              className="absolute right-[10px] top-[10px]"
            />
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
