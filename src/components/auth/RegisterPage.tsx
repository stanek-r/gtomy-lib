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
import classNames from 'classnames';

interface RegisterForm {
  username: string;
  password: string;
  passwordAgain: string;
  email: string;
}

interface Props {
  isInDialog?: boolean;
  toggleRegister?: () => void;
}

export function RegisterPage({ isInDialog, toggleRegister }: Props) {
  const { isAuthenticated, user, register, logout } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { t } = useTranslation('auth');
  const { control, handleSubmit } = useForm<RegisterForm>({
    defaultValues: { username: undefined, password: undefined, passwordAgain: undefined, email: undefined },
  });

  const onHandleSubmit = (value: RegisterForm) => {
    register(value.username, value.password, value.email).then((value) => {
      if (value) {
        if (isInDialog) {
          toggleRegister?.();
        } else {
          navigate('/login');
        }
      } else {
        setError(t('cannotRegister'));
      }
    });
  };

  if (isAuthenticated) {
    return (
      <div className={classNames('flex justify-center items-center w-full', !isInDialog ? 'py-4' : 'h-screen')}>
        <div className="flex flex-col w-[500px] max-w-full gap-y-4 p-4">
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
      className={classNames('flex justify-center items-center w-full', isInDialog ? 'py-4' : 'h-screen')}
    >
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
        <FormTextInput
          control={control}
          name="passwordAgain"
          type="password"
          rules={{ required: true }}
          placeholder={t('passwordConfirmation')}
        />
        <FormTextInput
          control={control}
          name="email"
          type="email"
          rules={{ required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g }}
          placeholder={t('email')}
        />
        {error && (
          <Typography color="red" className="text-center">
            {error}
          </Typography>
        )}
        <div className="btn-group justify-center">
          {isInDialog ? (
            <Button onClick={toggleRegister} className="w-1/2 sm:w-1/3">
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
