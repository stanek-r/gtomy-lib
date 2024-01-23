import React, { useState } from 'react';
import { Button } from '@/components/atoms/Button';
import { Typography } from '@/components/atoms/Typography';
import { useAuth } from '@/utils';
import { Link, useNavigate } from 'react-router-dom';
import { config } from '@/config';
import { ThemeSelect } from '@/components/atoms/Theme/ThemeSelect';
import { LanguageSelect } from '@/components/atoms/LanguageSelect/LanguageSelect';
import { useForm } from 'react-hook-form';
import { FormTextInput } from '@/components/form/FormTextInput';
import { useTranslation } from '@/utils/hooks/useTranslation';
import { twMerge } from 'tailwind-merge';

interface LoginForm {
  username: string;
  password: string;
}

interface Props {
  backURL?: string;
  isInDialog?: boolean;
  toggleRegister?: () => void;
  closeDialog?: () => void;
}

export function LoginPage({ backURL, isInDialog, toggleRegister, closeDialog }: Props) {
  const { isAuthenticated, user, login, logout } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { t } = useTranslation('auth');
  const { control, handleSubmit } = useForm<LoginForm>({
    defaultValues: { username: undefined, password: undefined },
  });

  const onHandleSubmit = (value: LoginForm) => {
    login(value.username, value.password).then((value) => {
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

  if (isAuthenticated) {
    return (
      <div className={twMerge('flex justify-center items-center w-full', isInDialog ? 'py-8' : 'h-screen')}>
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
      className={twMerge('flex justify-center items-center w-full', isInDialog ? 'py-8' : 'h-screen')}
    >
      <div className="flex w-[500px] max-w-full flex-col gap-y-3 p-4">
        {config.appName && (
          <Typography as="h1" size="3xl" weight="bold" className="mb-3 text-center">
            {config.appName}
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
        {error && (
          <Typography color="red" className="text-center">
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
        <div className="mt-3 flex justify-between">
          <ThemeSelect />
          <LanguageSelect />
        </div>
      </div>
    </form>
  );
}
