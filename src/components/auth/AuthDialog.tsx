import React, { useState } from 'react';
import { BaseDialog, BaseDialogProps } from '@/components/organisms/dialog/BaseDialog';
import { Typography } from '@/components/atoms/Typography';
import { useTranslation } from '@/utils/hooks/useTranslation';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';

export function AuthDialog(props: BaseDialogProps) {
  const { t } = useTranslation('auth');
  const [showRegister, setShowRegister] = useState<boolean>(false);

  const toggleRegister = () => {
    setShowRegister((prev) => !prev);
  };

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
