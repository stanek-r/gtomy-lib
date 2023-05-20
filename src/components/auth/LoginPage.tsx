import React, { useState } from 'react';
import { Button, Typography } from '../atoms';
import { useAuth, useCommonTranslation, Applications } from '../../utils';
import { Link, useNavigate } from 'react-router-dom';
import { config } from '../../config';
import { ThemeSelect } from '../molecules';
import { LanguageSelect } from '../molecules/LanguageSelect/LanguageSelect';
import { useForm } from 'react-hook-form';
import { FormTextInput } from '../form';

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
  const { t, st } = useCommonTranslation('auth');
  const { control, handleSubmit } = useForm<LoginForm>({
    defaultValues: { username: undefined, password: undefined },
  });

  let registerUrl: string | undefined;
  if (config.application) {
    if (config.application.name !== Applications.GTOMY_NET.name) {
      registerUrl = Applications.GTOMY_NET.baseUrl + '/register?backApp=' + config.application.name;
    }
  } else {
    registerUrl = Applications.GTOMY_NET.baseUrl + '/register';
  }

  const onHandleSubmit = (value: LoginForm) => {
    login(value.username, value.password).then((value) => {
      if (value) {
        navigate(backURL || '/');
      } else {
        setError(st('invalidCredentials'));
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
        {config.application?.displayName && (
          <Typography as="h1" size="3xl" weight="bold" className="text-center mb-3">
            {config.application.displayName}
          </Typography>
        )}
        <FormTextInput control={control} name="username" rules={{ required: true }} placeholder={st('username')} />
        <FormTextInput
          control={control}
          name="password"
          type="password"
          rules={{ required: true }}
          placeholder={st('password')}
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
          {registerUrl ? (
            <Button as="a" href={registerUrl} className="w-1/2 sm:w-1/3">
              {t('register')}
            </Button>
          ) : (
            <Button as={Link} to="/register" className="w-1/2 sm:w-1/3">
              {t('register')}
            </Button>
          )}
        </div>
        <div className="flex justify-between mt-3">
          <ThemeSelect />
          <LanguageSelect />
        </div>
      </div>
    </form>
  );
}
