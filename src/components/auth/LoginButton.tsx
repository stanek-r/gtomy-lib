import { AuthDialog } from '@/components/auth/AuthDialog';
import { useCallback } from 'react';
import { DialogElement } from '@/components/organisms/dialog/DialogElement';
import { useTranslation } from 'react-i18next';
import { useDialog } from '@/utils/hooks/useDialog';
import { useBreakpoint } from '@/utils/hooks/useBreakpoint';
import { useLoginRedirectStore } from '@/utils/hooks/storage/useLoginRedirectStore';
import { Button } from '@/components/atoms/Button/Button';
import { useConfig } from '@/utils/ConfigProvider';

export interface LoginButtonProps {
  className?: string;
  size?: 'sm' | 'lg';
}

export function LoginButton({ className, size }: LoginButtonProps) {
  const { t } = useTranslation('auth');
  const { openDialog, dialogElementProps } = useDialog(AuthDialog);
  const { isOverBreakpoint } = useBreakpoint('lg');
  const [setRedirectUrl] = useLoginRedirectStore((state) => [state.setRedirectUrl]);
  const { navigate } = useConfig();

  const login = useCallback(() => {
    if (isOverBreakpoint || navigate == null) {
      openDialog();
    } else {
      setRedirectUrl(window.location.pathname);
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
