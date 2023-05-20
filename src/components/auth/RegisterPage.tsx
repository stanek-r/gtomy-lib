import React, { useState } from 'react';
import { Button, Typography } from '../atoms';
import { useAuth, useCommonTranslation, Applications } from '../../utils';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { config } from '../../config';
import { ThemeSelect } from '../molecules';
import { LanguageSelect } from '../molecules/LanguageSelect/LanguageSelect';
import { useForm } from 'react-hook-form';
import { FormTextInput } from '../form';

interface RegisterForm {
  username: string;
  password: string;
  passwordAgain: string;
  email: string;
}

export function RegisterPage() {
  const { isAuthenticated, user, register, logout } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t, st } = useCommonTranslation('auth');
  const { control, handleSubmit } = useForm<RegisterForm>({
    defaultValues: { username: undefined, password: undefined, passwordAgain: undefined, email: undefined },
  });

  let backAppLoginUrl: string | undefined;
  if (searchParams.has('backApp')) {
    const application = Applications.getByName(searchParams.get('backApp')!);
    if (application) {
      backAppLoginUrl = application.baseUrl + '/login';
    }
  }

  const onHandleSubmit = (value: RegisterForm) => {
    register(value.username, value.password, value.email).then((value) => {
      if (value) {
        if (backAppLoginUrl) {
          window.location.href = backAppLoginUrl;
        } else {
          navigate('/login');
        }
      } else {
        setError(st('cannotRegister'));
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
            {backAppLoginUrl ? (
              <Button as="a" href={backAppLoginUrl}>
                {t('common:back')}
              </Button>
            ) : (
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
        <FormTextInput
          control={control}
          name="passwordAgain"
          type="password"
          rules={{ required: true }}
          placeholder={st('passwordConfirmation')}
        />
        <FormTextInput
          control={control}
          name="email"
          type="email"
          rules={{ required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g }}
          placeholder={st('email')}
        />
        {error && (
          <Typography color="red" className="text-center">
            {error}
          </Typography>
        )}
        <div className="btn-group justify-center">
          {backAppLoginUrl ? (
            <Button as="a" href={backAppLoginUrl} className="w-1/2 sm:w-1/3">
              {t('login')}
            </Button>
          ) : (
            <Button as={Link} to="/login" className="w-1/2 sm:w-1/3">
              {t('login')}
            </Button>
          )}
          <Button type="submit" className="w-1/2 sm:w-1/3" color="primary">
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
