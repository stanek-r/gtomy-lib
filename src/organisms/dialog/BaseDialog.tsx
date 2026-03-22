import * as Dialog from '@radix-ui/react-dialog';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { twJoin } from 'tailwind-merge';
import { colorOptions, ExtendedBaseDialogProps, maxWidthOptions } from '@/organisms/dialog/BaseDialog.core';
import { Icon } from '@/components/Icon/Icon';
import { ButtonIcon } from '@/components/ButtonIcon/ButtonIcon';
import { useCallback } from 'react';

export function BaseDialog({
  onOpenChange,
  closable = true,
  maxWidth,
  actions,
  children,
  spacing = true,
  grow = false,
  icon,
  title,
  color = 'neutral',
}: ExtendedBaseDialogProps) {
  const maxWidthClasses = maxWidth ? maxWidthOptions[maxWidth] : maxWidthOptions.md;
  const colorClasses = colorOptions[color];

  const onOpenChangeHandler = useCallback(
    (open: boolean) => {
      if (closable) {
        onOpenChange?.(open);
      }
    },
    [onOpenChange, closable]
  );

  const onClose = useCallback(() => onOpenChange?.(false), [onOpenChange]);

  const classes = twJoin(grow && 'flex flex-col min-h-full', spacing && (grow ? 'gap-y-4' : 'space-y-4'));

  return (
    <Dialog.Root open={true} onOpenChange={onOpenChangeHandler}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-20 bg-black opacity-25" />
        <Dialog.Content
          aria-describedby={undefined}
          className={twJoin(
            'fixed top-1/2 left-1/2 max-h-[85dvh] w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-[6px] p-4 md:p-6 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none overflow-y-auto z-30',
            colorClasses,
            maxWidthClasses
          )}
        >
          <Dialog.Title className="hidden">{title}</Dialog.Title>
          {icon ? (
            <div className="flex gap-4">
              <Icon icon={icon} size="xl" />
              <div className={classes}>{children}</div>
            </div>
          ) : (
            <div className={classes}>{children}</div>
          )}
          {actions && <div className="flex justify-end gap-x-2 pt-4">{actions}</div>}
          {closable && (
            <ButtonIcon
              icon={XMarkIcon}
              variant="circle"
              size="sm"
              color="ghost"
              className="absolute right-[10px] top-[10px]"
              onClick={onClose}
            />
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
