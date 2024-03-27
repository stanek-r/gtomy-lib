import React from 'react';
import { Route } from 'react-router-dom';
import { NotFoundPage } from '@/components/pages/NotFoundPage';
import { LoginPage, PrivacyPolicyPage, ProfilePage, RegisterPage } from '@/components/pages';
import { withRequireAuth } from '@/utils/withHelpers';

export interface GTomyRouteProps {
  showLanguage?: boolean;
  showTheme?: boolean;
  profile?: boolean;
  privacyPolicy?: boolean;
}

export function GTomyRoute({ showLanguage, showTheme, profile, privacyPolicy }: GTomyRouteProps) {
  return (
    <>
      {profile && <Route path="/profile" element={withRequireAuth(ProfilePage, 'user')} />}
      {privacyPolicy && <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />}
      <Route path="/login" element={<LoginPage showLanguage={showLanguage} showTheme={showTheme} />} />
      <Route path="/register" element={<RegisterPage showLanguage={showLanguage} showTheme={showTheme} />} />
      <Route path="*" element={<NotFoundPage />} />
    </>
  );
}
