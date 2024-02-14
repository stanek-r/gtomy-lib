import React, { FunctionComponent, useEffect } from 'react';
import { PERM_ROLES, PermRoles, useAuth } from '@/utils';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/atoms/Button';
import { Typography } from '@/components/atoms/Typography';
import { useTranslation } from '@/utils/hooks/useTranslation';
import { config } from '@/config';

export function withRequireAuth(
  Component: FunctionComponent,
  minimalRole: PermRoles,
  MenuComponent?: FunctionComponent,
  FooterComponent?: FunctionComponent
): JSX.Element {
  return (
    <RequireAuth
      minimalRole={minimalRole}
      menu={MenuComponent != null ? <MenuComponent /> : undefined}
      footer={FooterComponent != null ? <FooterComponent /> : undefined}
    >
      <Component />
    </RequireAuth>
  );
}

export interface RequireAuthProps {
  minimalRole: PermRoles;
  children: JSX.Element;
  menu?: JSX.Element;
  footer?: JSX.Element;
}

export function RequireAuth({ minimalRole = 'user', children, footer, menu }: RequireAuthProps) {
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
      <div className="flex h-screen flex-col">
        {menu}
        <div className="flex w-[500px] max-w-full flex-col gap-y-4 p-4">
          <Typography size="3xl" weight="bold" className="text-center">
            {t('noAccess', { minimalRole: t('role.' + minimalRole) })}
          </Typography>
          <div className="join">
            <Button as={Link} to="/" className="join-item" color="primary">
              {t('back', { ns: 'common' })}
            </Button>
            <Button onClick={logout} className="join-item">
              {t('logout')}
            </Button>
          </div>
        </div>
        {footer}
      </div>
    );
  }
  return children;
}
