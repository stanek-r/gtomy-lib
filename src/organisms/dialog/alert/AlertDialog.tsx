import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { AlertDialogProps } from '@/organisms/dialog/alert/AlertDialog.core';
import { Button } from '@/components/Button/Button';
import { BaseDialog } from '@/organisms/dialog/BaseDialog';
import { Typography } from '@/components/Typography/Typography';
import { useGTomyContext } from '@/utils/GTomyProvider/useGTomyContext';

export function AlertDialog({ title, text, ...props }: AlertDialogProps) {
  const gtomyContext = useGTomyContext();

  const actions = <Button onClick={() => props.onOpenChange?.(false)}>{gtomyContext?.translation?.close}</Button>;

  return (
    <BaseDialog icon={ExclamationCircleIcon} actions={actions} closable={false} {...props}>
      <Typography size="3xl">{title}</Typography>
      <Typography as="p">{text}</Typography>
    </BaseDialog>
  );
}
