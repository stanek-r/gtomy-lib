import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { useAuth } from '@/utils/hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { useLoginRedirectStore } from '@/utils/hooks/storage/useLoginRedirectStore';
import { useConfig } from '@/utils/ConfigProvider';

export interface GoogleAuthProps {
  setError: Dispatch<SetStateAction<string | null>>;
  isInDialog?: boolean;
  closeDialog?: () => void;
  className?: string;
  rememberLogin: boolean;
}

export function GoogleLoginButton({ className, setError, isInDialog, closeDialog, rememberLogin }: GoogleAuthProps) {
  const { loginWithGoogle } = useAuth();
  const { t } = useTranslation('auth');
  const { navigate } = useConfig();
  const [googlePlugin, setGooglePlugin] = useState<any>(null);
  const [redirectUrl, setRedirectUrl] = useLoginRedirectStore((state) => [state.redirectUrl, state.setRedirectUrl]);
  const { googleAuthClientId } = useConfig();

  useEffect(() => {
    import('@react-oauth/google')
      .then((plugin) => {
        setGooglePlugin(plugin);
      })
      .catch((e) => console.error(e));
  }, []);

  const onSuccess = useCallback(
    (credentialResponse: any) => {
      if (credentialResponse.credential == null || navigate == null) {
        setError(t('cannotLoginWiaGoogle'));
        return;
      }
      setError(null);
      loginWithGoogle(credentialResponse.credential, rememberLogin).then((value) => {
        if (value) {
          if (isInDialog) {
            closeDialog?.();
          } else {
            navigate(redirectUrl ?? '/');
            setRedirectUrl(null);
          }
        } else {
          setError(t('loginErrorGoogle'));
        }
      });
    },
    [setError, t, loginWithGoogle, rememberLogin, isInDialog, closeDialog, navigate, redirectUrl, setRedirectUrl]
  );

  const onError = useCallback(() => setError(t('cannotLoginWiaGoogle')), [setError, t]);

  if (googlePlugin == null) {
    return null;
  }

  return (
    <div className={twMerge('[color-scheme:light]', className)}>
      <googlePlugin.GoogleOAuthProvider clientId={googleAuthClientId!}>
        <googlePlugin.GoogleLogin onSuccess={onSuccess} onError={onError} theme="filled_blue" />
      </googlePlugin.GoogleOAuthProvider>
    </div>
  );
}
