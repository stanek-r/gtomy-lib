import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { config } from '@/config';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { useAuth, useTranslation } from '@/utils/hooks';

export interface GoogleAuthProps {
  setError: Dispatch<SetStateAction<string | null>>;
  isInDialog?: boolean;
  closeDialog?: () => void;
  backURL?: string;
  className?: string;
}

export function GoogleLoginButton({ className, setError, isInDialog, closeDialog, backURL }: GoogleAuthProps) {
  const { loginWithGoogle } = useAuth();
  const { t } = useTranslation('auth');
  const navigate = useNavigate();
  const [googlePlugin, setGooglePlugin] = useState<any>(null);

  useEffect(() => {
    import('@react-oauth/google')
      .then((plugin) => {
        setGooglePlugin(plugin);
      })
      .catch((e) => console.error(e));
  }, []);

  const onSuccess = (credentialResponse: any) => {
    if (credentialResponse.credential == null) {
      setError(t('cannotLoginWiaGoogle'));
      return;
    }
    setError(null);
    loginWithGoogle(credentialResponse.credential).then((value) => {
      if (value) {
        if (isInDialog) {
          closeDialog?.();
        } else {
          navigate(backURL || '/');
        }
      } else {
        setError(t('loginErrorGoogle'));
      }
    });
  };

  const onError = () => setError(t('cannotLoginWiaGoogle'));

  if (googlePlugin == null) {
    return null;
  }

  return (
    <div className={twMerge('[color-scheme:light]', className)}>
      <googlePlugin.GoogleOAuthProvider clientId={config.googleAuthClientId!}>
        <googlePlugin.GoogleLogin onSuccess={onSuccess} onError={onError} theme="filled_blue" />
      </googlePlugin.GoogleOAuthProvider>
    </div>
  );
}
