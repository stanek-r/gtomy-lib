import React from 'react';
import { FormPage } from '@/components/layout';
import { ProfileForm } from '@/components/auth/ProfileForm';

export function ProfilePage() {
  return (
    <FormPage>
      <ProfileForm />
    </FormPage>
  );
}
