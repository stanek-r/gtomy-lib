import React, { ReactNode } from 'react';
import { useAuth } from '../../utils';

export function RequireAuth({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    window.location.replace('/login');
    return null;
  }

  return children;
}
