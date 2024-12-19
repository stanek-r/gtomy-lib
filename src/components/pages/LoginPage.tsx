import { ColumnPage } from '@/components/layout/ColumnPage';
import { LoginForm } from '@/components/auth/LoginForm';

export interface LoginPageProps {
  showLanguage?: boolean;
  showTheme?: boolean;
}

export function LoginPage({ showTheme, showLanguage }: LoginPageProps) {
  return (
    <ColumnPage>
      <LoginForm showLanguage={showLanguage} showTheme={showTheme} />
    </ColumnPage>
  );
}
