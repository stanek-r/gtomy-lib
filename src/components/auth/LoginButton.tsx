import { useBreakpoint, useDialog, useTranslation } from '@/utils/hooks';
import { Button } from '@/components/atoms/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthDialog } from '@/components/auth/AuthDialog';
import { useLoginRedirectStore } from '@/utils/hooks/storage';

export interface LoginButtonProps {
  className?: string;
  size?: 'sm' | 'lg';
}

export function LoginButton({ className, size }: LoginButtonProps) {
  const { t } = useTranslation('auth');
  const { openDialog, DialogElement } = useDialog(AuthDialog);
  const { isOverBreakpoint } = useBreakpoint('lg');
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [setRedirectUrl] = useLoginRedirectStore((state: any) => [state.setRedirectUrl]);

  const login = () => {
    if (isOverBreakpoint) {
      openDialog();
    } else {
      setRedirectUrl(pathname);
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
