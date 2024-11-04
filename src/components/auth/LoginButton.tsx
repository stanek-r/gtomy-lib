import { useBreakpoint, useDialog, useTranslation } from '@/utils/hooks';
import { Button } from '@/components/atoms/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthDialog } from '@/components/auth/AuthDialog';
import { useLoginRedirectStore } from '@/utils/hooks/storage';
import { useCallback } from 'react';
import { DialogElement } from '@/components/organisms/dialog/DialogElement';

export interface LoginButtonProps {
  className?: string;
  size?: 'sm' | 'lg';
}

export function LoginButton({ className, size }: LoginButtonProps) {
  const { t } = useTranslation('auth');
  const { openDialog, dialogElementProps } = useDialog(AuthDialog);
  const { isOverBreakpoint } = useBreakpoint('lg');
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [setRedirectUrl] = useLoginRedirectStore((state) => [state.setRedirectUrl]);

  const login = useCallback(() => {
    if (isOverBreakpoint) {
      openDialog();
    } else {
      setRedirectUrl(pathname);
      navigate('/login');
    }
  }, [isOverBreakpoint, openDialog, setRedirectUrl, navigate]);

  return (
    <>
      <DialogElement {...dialogElementProps} />
      <Button onClick={login} size={size} color="primary" className={className} wide>
        {t('login')}
      </Button>
    </>
  );
}
