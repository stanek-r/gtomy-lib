import React, { useEffect } from 'react';
import { useAuth } from '@/utils';
import { useNavigate } from 'react-router-dom';
import { Button, Typography } from '@/components/atoms';
import { useTranslation } from 'react-i18next';

export function RequireAuth({
  minimalRole,
  children,
}: {
  minimalRole?: 'user' | 'subscriber' | 'admin';
  children: JSX.Element;
}) {
  const { isAuthenticated, user, logout } = useAuth();
  const { t } = useTranslation('auth');
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
        <div className="flex flex-col w-[500px] max-w-full gap-y-4 p-4">
          <Typography size="3xl" weight="bold" className="text-center">
            {t('noAccess', { minimalRole: t('role.' + minimalRole) })}
          </Typography>
          <div className="flex justify-center gap-x-2">
            <Button onClick={logout}>{t('logout')}</Button>
          </div>
        </div>
      </div>
    );
  }
  return children;
}
