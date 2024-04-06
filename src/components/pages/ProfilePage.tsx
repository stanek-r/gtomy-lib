import React, { ReactNode } from 'react';
import { ColumnPage } from '@/components/layout';
import { ProfileForm } from '@/components/auth/ProfileForm';

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
