import { useTranslation } from '@/utils/hooks';
import { Button } from '@/components/atoms/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLoginRedirectStore } from '@/utils/hooks/storage';
import { useCallback } from 'react';

export interface LoginButtonProps {
  className?: string;
  size?: 'sm' | 'lg';
}

export function LoginButton({ className, size }: LoginButtonProps) {
  const { t } = useTranslation('auth');
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [setRedirectUrl] = useLoginRedirectStore((state) => [state.setRedirectUrl]);

  const login = useCallback(() => {
    setRedirectUrl(pathname);
    navigate('/login');
  }, [setRedirectUrl, navigate]);

  return (
    <Button onClick={login} size={size} color="primary" className={className} wide>
      {t('login')}
    </Button>
  );
}
