import { ColumnPage } from '@/components/layout';
import { RegisterForm } from '@/components/auth';

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
