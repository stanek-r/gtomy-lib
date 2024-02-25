import React from 'react';
import { FormPage } from '@/components/layout';
import { RegisterForm } from '@/components/auth';

export interface RegisterPageProps {
  showLanguage?: boolean;
  showTheme?: boolean;
}

export function RegisterPage({ showTheme, showLanguage }: RegisterPageProps) {
  return (
    <FormPage>
      <RegisterForm showLanguage={showLanguage} showTheme={showTheme} />
    </FormPage>
  );
}
