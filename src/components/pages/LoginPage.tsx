import { LoginForm } from '@/components/auth';
import { ColumnPage } from '@/components/layout';

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
