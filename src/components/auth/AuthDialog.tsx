import React, { useState } from 'react';
import { BaseDialog, BaseDialogProps } from '@/components/organisms/dialog/BaseDialog';
import { Typography } from '@/components/atoms/Typography';
import { useTranslation } from '@/utils/hooks/useTranslation';
import { LoginPage } from '@/components/auth/LoginPage';
import { RegisterPage } from '@/components/auth/RegisterPage';

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
        <RegisterPage isInDialog toggleRegister={toggleRegister} />
      ) : (
        <LoginPage isInDialog toggleRegister={toggleRegister} closeDialog={() => props.onOpenChange?.(false)} />
      )}
    </BaseDialog>
  );
}
