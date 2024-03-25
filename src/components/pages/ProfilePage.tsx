import React from 'react';
import { ColumnPage } from '@/components/layout';
import { ProfileForm } from '@/components/auth/ProfileForm';

export function ProfilePage() {
  return (
    <ColumnPage>
      <ProfileForm />
    </ColumnPage>
  );
}
