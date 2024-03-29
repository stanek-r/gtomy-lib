import React from 'react';
import { Route } from 'react-router-dom';
import { NotFoundPage } from '@/components/pages/NotFoundPage';
import { PrivacyPolicyPage, ProfilePage } from '@/components/pages';
import { withRequireAuth } from '@/utils/withHelpers';

export const NOT_FOUND_ROUTE = <Route path="*" element={<NotFoundPage />} />;
export const PRIVACY_POLICY_ROUTE = <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />;
export const BASE_PROFILE_ROUTE = <Route path="/profile" element={withRequireAuth(ProfilePage, 'user')} />;
