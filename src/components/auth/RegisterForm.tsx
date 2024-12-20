import { useCallback, useState } from 'react';
import { ThemeSelect } from '@/components/atoms/Theme/ThemeSelect';
import { LanguageSelect } from '@/components/atoms/LanguageSelect/LanguageSelect';
import { useForm } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import { useAuth } from '@/utils/hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { Typography } from '@/components/atoms/Typography/Typography';
import { Button } from '@/components/atoms/Button/Button';
import { FormTextInput } from '@/components/form/FormTextInput/FormTextInput';
import { useConfig } from '@/utils/config/context';

interface RegisterForm {
  username: string;
  password: string;
  passwordAgain: string;
  email: string;
}

interface Props {
  isInDialog?: boolean;
  toggleRegister?: () => void;
  showLanguage?: boolean;
  showTheme?: boolean;
}

export function RegisterForm({ isInDialog, toggleRegister, showTheme, showLanguage }: Props) {
  const { isAuthenticated, user, register, logout } = useAuth();
  const { appDisplayName, navigate } = useConfig();
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation('auth');
  const { control, handleSubmit } = useForm<RegisterForm>({
    defaultValues: { username: undefined, password: undefined, passwordAgain: undefined, email: undefined },
  });

  const onHandleSubmit = useCallback(
    (value: RegisterForm) => {
      register(value.username, value.password, value.email).then((value) => {
        if (value && navigate != null) {
          if (isInDialog) {
            toggleRegister?.();
          } else {
            navigate('/login');
          }
        } else {
          setError(t('cannotRegister'));
        }
      });
    },
    [register, isInDialog, toggleRegister, navigate, setError, t]
  );

  const onBackClick = useCallback(() => {
    navigate?.('/');
  }, [navigate]);

  const onLoginClick = useCallback(() => {
    navigate?.('/login');
  }, [navigate]);

  if (isAuthenticated) {
    return (
      <div className={twMerge('flex justify-center items-center w-full', isInDialog ? 'py-4' : 'flex-1')}>
        <div className="flex w-[500px] max-w-full flex-col gap-y-4 p-4">
          <Typography size="3xl" weight="bold" className="text-center">
            {t('alreadyLoggedIn', { name: user?.displayName })}
          </Typography>
          <div className="flex justify-center gap-x-2">
            {!isInDialog && <Button onClick={onBackClick}>{t('common:back')}</Button>}
            <Button onClick={logout}>{t('logout')}</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onHandleSubmit)}
      className={twMerge('flex justify-center items-center w-full', isInDialog ? 'py-4' : 'flex-1')}
    >
      <div className="flex w-[500px] max-w-full flex-col gap-y-3 p-4">
        {appDisplayName && (
          <Typography as="h1" size="3xl" weight="bold" className="mb-3 text-center">
            {appDisplayName}
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
          <Typography color="error" content={false} className="text-center">
            {error}
          </Typography>
        )}
        <div className="join justify-center">
          {isInDialog ? (
            <Button onClick={toggleRegister} className="join-item w-1/2 sm:w-1/3">
              {t('login')}
            </Button>
          ) : (
            <Button onClick={onLoginClick} className="join-item w-1/2 sm:w-1/3">
              {t('login')}
            </Button>
          )}
          <Button type="submit" className="join-item w-1/2 sm:w-1/3" color="primary">
            {t('register')}
          </Button>
        </div>
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
