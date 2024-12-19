import { ReactNode } from 'react';
import { ProfileForm } from '@/components/auth/ProfileForm';
import { ColumnPage } from '@/components/layout/ColumnPage';

export interface ProfilePageProps {
  width?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  children?: ReactNode;
}

export function ProfilePage({ width, children }: ProfilePageProps) {
  return (
    <ColumnPage width={width}>
      <ProfileForm>{children}</ProfileForm>
    </ColumnPage>
  );
}
