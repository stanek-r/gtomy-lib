import { useDialog, useTranslation } from '@/utils/hooks';
import { Button } from '@/components/atoms/Button';
import { useNavigate } from 'react-router-dom';
import { AuthDialog } from '@/components/auth/AuthDialog';

export interface LoginButtonProps {
  authDialog?: boolean;
  className?: string;
  size?: 'sm' | 'lg';
}

export function LoginButton({ authDialog, className, size }: LoginButtonProps) {
  const { t } = useTranslation('auth');
  const { openDialog, DialogElement } = useDialog(AuthDialog);
  const navigate = useNavigate();

  const login = () => {
    if (authDialog) {
      openDialog();
    } else {
      navigate('/login');
    }
  };

  return (
    <>
      <DialogElement />
      <Button onClick={login} size={size} color="primary" className={className} wide>
        {t('login')}
      </Button>
    </>
  );
}
