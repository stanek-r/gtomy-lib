import React from 'react';
import { useAuth } from '../../utils';

export function RequireAuth({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    window.location.replace('/login');
    return null;
  }

  return children;
}
