import { ColumnPage } from '@/components/layout/ColumnPage';
import { RegisterForm } from '@/components/auth/RegisterForm';

export interface RegisterPageProps {
  showLanguage?: boolean;
  showTheme?: boolean;
}

export function RegisterPage({ showTheme, showLanguage }: RegisterPageProps) {
  return (
    <ColumnPage>
      <RegisterForm showLanguage={showLanguage} showTheme={showTheme} />
    </ColumnPage>
  );
}
