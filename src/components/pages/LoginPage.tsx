import React from 'react';
import { FormPage } from '@/components/layout';
import { LoginForm } from '@/components/auth';

export interface LoginPageProps {
  showLanguage?: boolean;
  showTheme?: boolean;
}

export function LoginPage({ showTheme, showLanguage }: LoginPageProps) {
  return (
    <FormPage>
      <LoginForm showLanguage={showLanguage} showTheme={showTheme} />
    </FormPage>
  );
}
