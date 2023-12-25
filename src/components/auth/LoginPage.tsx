import React, { useState } from 'react';
import { Button, Typography } from '@/components/atoms';
import { useAuth } from '@/utils';
import { Link, useNavigate } from 'react-router-dom';
import { config } from '@/config';
import { ThemeSelect } from '@/components/molecules/Theme/ThemeSelect';
import { LanguageSelect } from '@/components/molecules/LanguageSelect/LanguageSelect';
import { useForm } from 'react-hook-form';
import { FormTextInput } from '@/components/form/FormTextInput';
import { useTranslation } from 'react-i18next';

interface LoginForm {
  username: string;
  password: string;
}

interface Props {
  backURL?: string;
}

export function LoginPage({ backURL }: Props) {
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
        navigate(backURL || '/');
      } else {
        setError(t('invalidCredentials'));
      }
    });
  };

  if (isAuthenticated) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <div className="flex flex-col w-[500px] max-w-full gap-y-4 p-4">
          <Typography size="3xl" weight="bold" className="text-center">
            {t('alreadyLoggedIn', { name: user?.displayName })}
          </Typography>
          <div className="flex justify-center gap-x-2">
            <Button as={Link} to="/">
              {t('common:back')}
            </Button>
            <Button onClick={logout}>{t('logout')}</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onHandleSubmit)} className="flex justify-center items-center w-full h-screen">
      <div className="flex flex-col w-[500px] max-w-full gap-y-3 p-4">
        {config.appName && (
          <Typography as="h1" size="3xl" weight="bold" className="text-center mb-3">
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
        <div className="btn-group justify-center">
          <Button type="submit" className="w-1/2 sm:w-1/3" color="primary">
            {t('login')}
          </Button>
          <Button as={Link} to="/register" className="w-1/2 sm:w-1/3">
            {t('register')}
          </Button>
        </div>
        <div className="flex justify-between mt-3">
          <ThemeSelect />
          <LanguageSelect />
        </div>
      </div>
    </form>
  );
}
