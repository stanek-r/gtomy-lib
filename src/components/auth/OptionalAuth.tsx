import { useEffect } from 'react';
import { useAuth } from '../../utils';

export function OptionalAuth({ children }: { children: JSX.Element }) {
  const { token, refreshUser } = useAuth();

  useEffect(() => {
    if (token) {
      refreshUser();
    }
  }, [token]);

  return children;
}
