import { useAuth, useTranslation } from '@/utils/hooks';
import { Button } from '@/components/atoms/Button';
import { useNavigate } from 'react-router-dom';

export interface LoginButtonProps {
  authDialog?: boolean;
  className?: string;
  size?: 'sm' | 'lg';
}

export function LoginButton({ authDialog, className, size }: LoginButtonProps) {
  const { t } = useTranslation('auth');
  const { openLoginDialog, AuthDialogElement } = useAuth();
  const navigate = useNavigate();

  const login = () => {
    if (authDialog) {
      openLoginDialog();
    } else {
      navigate('/login');
    }
  };

  return (
    <>
      <AuthDialogElement />
      <Button onClick={login} size={size} color="primary" className={className} wide>
        {t('login')}
      </Button>
    </>
  );
}
