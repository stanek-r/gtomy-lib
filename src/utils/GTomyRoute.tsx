import { Route } from 'react-router-dom';
import { NotFoundPage } from '@/components/pages/NotFoundPage';
import { PrivacyPolicyPage, ProfilePage, ProfilePageProps } from '@/components/pages';
import { RequireAuth } from '@/components/auth';

export function NotFoundRoute() {
  return <Route path="*" element={<NotFoundPage />} />;
}

export function PrivacyPolicyRoute() {
  return <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />;
}

export function BaseProfileRoute(props: ProfilePageProps) {
  return (
    <Route
      path="/profile"
      element={
        <RequireAuth minimalRole="user">
          <ProfilePage {...props} />
        </RequireAuth>
      }
    />
  );
}
