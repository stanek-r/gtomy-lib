import React, { useEffect } from 'react';
import { useAuth } from '@/utils';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/atoms/Button';
import { Typography } from '@/components/atoms/Typography';
import { useTranslation } from '@/utils/hooks/useTranslation';

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
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex w-[500px] max-w-full flex-col gap-y-4 p-4">
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
