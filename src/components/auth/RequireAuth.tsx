import React, { useEffect } from 'react';
import { useAuth } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { Button, Typography } from '../atoms';

export function RequireAuth({
  minimalRole,
  children,
}: {
  minimalRole?: 'user' | 'subscriber' | 'admin';
  children: JSX.Element;
}) {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }
  if ((minimalRole === 'subscriber' && user!.role === 'user') || (minimalRole === 'admin' && user!.role !== 'admin')) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <div className="flex flex-col w-[400px] max-w-full gap-y-4">
          <Typography size="3xl" weight="bold" className="text-center">
            You don&apos;t have access to this service, need {minimalRole}!
          </Typography>
          <div className="flex justify-center gap-x-2">
            <Button onClick={logout}>Logout</Button>
          </div>
        </div>
      </div>
    );
  }
  return children;
}
