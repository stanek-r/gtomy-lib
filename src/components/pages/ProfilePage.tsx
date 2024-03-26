import React from 'react';
import { ColumnPage } from '@/components/layout';
import { ProfileForm } from '@/components/auth/ProfileForm';

export interface ProfilePageProps {
  width?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export function ProfilePage({ width }: ProfilePageProps) {
  return (
    <ColumnPage width={width}>
      <ProfileForm />
    </ColumnPage>
  );
}
