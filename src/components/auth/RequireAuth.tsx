import React, { useEffect } from 'react';
import { PERM_ROLES, PermRoles, useAuth } from '@/utils';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/atoms/Button';
import { Typography } from '@/components/atoms/Typography';
import { useTranslation } from '@/utils/hooks/useTranslation';
import { config } from '@/config';

export function RequireAuth({ minimalRole = 'user', children }: { minimalRole: PermRoles; children: JSX.Element }) {
  const { isAuthenticated, user, logout } = useAuth();
  const { t } = useTranslation('auth');
  const navigate = useNavigate();
  const minimalRoleId = PERM_ROLES[minimalRole];

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }
  const role = user!.roles.find((role) => role.application === config.appName)?.role ?? 'user';
  const roleId = PERM_ROLES[role as PermRoles];
  if (roleId < minimalRoleId) {
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
