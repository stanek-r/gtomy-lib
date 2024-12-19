import { useCallback, useState } from 'react';
import { BaseDialog, BaseDialogProps } from '@/components/organisms/dialog/BaseDialog';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { useTranslation } from 'react-i18next';
import { Typography } from '@/components/atoms/Typography/Typography';

export function AuthDialog(props: BaseDialogProps) {
  const { t } = useTranslation('auth');
  const [showRegister, setShowRegister] = useState<boolean>(false);

  const toggleRegister = useCallback(() => {
    setShowRegister((prev) => !prev);
  }, [setShowRegister]);

  return (
    <BaseDialog {...props}>
      <Typography size="3xl">{showRegister ? t('register') : t('login')}</Typography>
      {showRegister ? (
        <RegisterForm isInDialog toggleRegister={toggleRegister} />
      ) : (
        <LoginForm isInDialog toggleRegister={toggleRegister} closeDialog={() => props.onOpenChange?.(false)} />
      )}
    </BaseDialog>
  );
}
