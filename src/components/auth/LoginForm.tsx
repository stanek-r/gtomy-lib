import React, { useState } from 'react';
import { Button } from '@/components/atoms/Button';
import { Typography } from '@/components/atoms/Typography';
import { Link, useNavigate } from 'react-router-dom';
import { config } from '@/config';
import { ThemeSelect } from '@/components/atoms/Theme/ThemeSelect';
import { LanguageSelect } from '@/components/atoms/LanguageSelect/LanguageSelect';
import { useForm } from 'react-hook-form';
import { FormTextInput } from '@/components/form/FormTextInput';
import { useTranslation } from '@/utils/hooks/useTranslation';
import { twMerge } from 'tailwind-merge';
import { GoogleLoginButton } from '@/components/auth/GoogleLoginButton';
import { useLoginRedirectStore } from '@/utils/hooks/storage/useLoginRedirectStore';
import { useAuth } from '@/utils/hooks';
import { FormCheckbox } from '@/components/form/FormCheckbox';

interface LoginForm {
  username: string;
  password: string;
  rememberLogin: boolean;
}

interface Props {
  backURL?: string;
  isInDialog?: boolean;
  toggleRegister?: () => void;
  closeDialog?: () => void;
  showLanguage?: boolean;
  showTheme?: boolean;
}

export function LoginForm({ backURL, isInDialog, toggleRegister, closeDialog, showTheme, showLanguage }: Props) {
  const { isAuthenticated, user, login, logout } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { t } = useTranslation('auth');
  const { control, handleSubmit, watch } = useForm<LoginForm>({
    defaultValues: { username: undefined, password: undefined, rememberLogin: false },
  });
  const [redirectUrl, setRedirectUrl] = useLoginRedirectStore((state: any) => [
    state.redirectUrl,
    state.setRedirectUrl,
  ]);

  const onHandleSubmit = (value: LoginForm) => {
    login(value.username, value.password, value.rememberLogin).then((value) => {
      if (value === true) {
        if (isInDialog) {
          closeDialog?.();
        } else {
          navigate(backURL ?? redirectUrl ?? '/');
          setRedirectUrl(undefined);
        }
      } else if (value === false) {
        setError(t('invalidCredentials'));
      } else {
        setError(t('loginError'));
      }
    });
  };

  if (isAuthenticated) {
    return (
      <div className={twMerge('flex justify-center items-center w-full', isInDialog ? 'py-8' : 'flex-1')}>
        <div className="flex w-[500px] max-w-full flex-col gap-y-4 p-4">
          <Typography size="3xl" weight="bold" className="text-center">
            {t('alreadyLoggedIn', { name: user?.displayName })}
          </Typography>
          <div className="flex justify-center gap-x-2">
            {!isInDialog && (
              <Button as={Link} to="/">
                {t('common:back')}
              </Button>
            )}
            <Button onClick={logout}>{t('logout')}</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onHandleSubmit)}
      className={twMerge('flex justify-center items-center w-full', isInDialog ? 'py-8' : 'flex-1')}
    >
      <div className="flex w-[500px] max-w-full flex-col gap-y-3 p-4">
        {config.appDisplayName && (
          <Typography as="h1" size="3xl" weight="bold" className="mb-3 text-center">
            {config.appDisplayName}
          </Typography>
        )}
        <FormTextInput control={control} name="username" rules={{ required: true }} placeholder={t('username')} />
        <FormTextInput
          control={control}
          name="password"
          type="password"
          rules={{ required: true }}
          placeholder={t('password')}
        />
        <FormCheckbox control={control} name="rememberLogin" label={t('rememberLogin')} />
        {error && (
          <Typography color="error" content={false} className="text-center">
            {error}
          </Typography>
        )}
        <div className="join justify-center">
          <Button type="submit" className="join-item w-1/2 sm:w-1/3" color="primary">
            {t('login')}
          </Button>
          {isInDialog ? (
            <Button onClick={toggleRegister} className="join-item w-1/2 sm:w-1/3">
              {t('register')}
            </Button>
          ) : (
            <Button as={Link} to="/register" className="join-item w-1/2 sm:w-1/3">
              {t('register')}
            </Button>
          )}
        </div>
        {config.googleAuthClientId && (
          <GoogleLoginButton
            className="self-center"
            setError={setError}
            isInDialog={isInDialog}
            closeDialog={closeDialog}
            backURL={backURL}
          />
        )}
        {(showLanguage || showTheme) && (
          <div className="mt-3 flex justify-between">
            {showLanguage && <LanguageSelect />}
            {showTheme && <ThemeSelect />}
          </div>
        )}
      </div>
    </form>
  );
}
