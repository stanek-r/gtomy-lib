import React, { Dispatch, SetStateAction } from 'react';
import { CredentialResponse, GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { config } from '@/config';
import { useAuth, useTranslation } from '@/utils';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

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

  const onSuccess = (credentialResponse: CredentialResponse) => {
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
        setError(t('invalidCredentials'));
      }
    });
  };

  const onError = () => setError(t('cannotLoginWiaGoogle'));

  return (
    <div className={twMerge('[color-scheme:light]', className)}>
      <GoogleOAuthProvider clientId={config.googleAuthClientId!}>
        <GoogleLogin onSuccess={onSuccess} onError={onError} theme="filled_blue" />
      </GoogleOAuthProvider>
    </div>
  );
}
