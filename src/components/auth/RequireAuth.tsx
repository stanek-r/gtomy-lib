import React from 'react';
import { useAuth } from '../../utils';
import { useNavigate } from 'react-router-dom';

export function RequireAuth({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  return children;
}
