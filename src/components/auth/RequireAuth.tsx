import React, { FunctionComponent, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/atoms/Button';
import { Typography } from '@/components/atoms/Typography';
import { useTranslation } from '@/utils/hooks/useTranslation';
import { config } from '@/config';
import { FormPage } from '@/components/layout';
import { ErrorState } from '@/components/atoms/ErrorState';
import { useLoginRedirectStore } from '@/utils/hooks/storage/useLoginRedirectStore';
import { PERM_ROLES, PermRoles, Roles } from '@/utils/hooks/storage';
import { useAuth, useRequest } from '@/utils/hooks';

export interface RequireAuthProps {
  MenuComponent?: FunctionComponent | JSX.Element;
  FooterComponent?: FunctionComponent | JSX.Element;
  minimalRole: PermRoles;
  children?: JSX.Element;
}

export function RequireAuth({
  MenuComponent,
  FooterComponent,
  minimalRole = 'user',
  children,
}: RequireAuthProps): JSX.Element | null {
  const { t } = useTranslation('auth');
  const { isAuthenticated, user, logout } = useAuth();
  const { put } = useRequest(config.authUrl);
  const [error, setError] = useState<any | null>(null);
  const [sent, setSent] = useState<boolean>(false);
  const navigate = useNavigate();
  const minimalRoleId = PERM_ROLES[minimalRole];
  const { pathname } = useLocation();
  const [setRedirectUrl] = useLoginRedirectStore((state: any) => [state.setRedirectUrl]);

  useEffect(() => {
    if (!isAuthenticated) {
      setRedirectUrl(pathname);
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleRequestAccess = () => {
    if (!isAuthenticated) {
      return;
    }
    put('/request-access', {
      application: config.appName,
      role: minimalRole,
    } as Roles)
      .then(() => {
        setError(null);
        setSent(true);
      })
      .catch((e) => setError(e));
  };

  if (!isAuthenticated) {
    return null;
  }
  const role = user!.roles.find((role) => role.application === config.appName)?.role ?? 'user';
  const roleId = PERM_ROLES[role as PermRoles];
  if (roleId < minimalRoleId) {
    return (
      <FormPage MenuComponent={MenuComponent} FooterComponent={FooterComponent}>
        <div className="flex w-full flex-1 items-center justify-center">
          <div className="flex w-[768px] max-w-full flex-col gap-y-3 p-4">
            <Typography size="3xl" weight="bold" className="text-center">
              {t('noAccess.title')}
            </Typography>
            <Typography size="3xl" className="text-center">
              {t('noAccess.subtitle', { minimalRole: t('role.' + minimalRole) })}
            </Typography>
            <div className="join justify-center">
              <Button as={Link} to="/" className="join-item w-1/2 sm:w-1/3" color="primary">
                {t('back', { ns: 'common' })}
              </Button>
              <Button onClick={logout} className="join-item w-1/2 sm:w-1/3">
                {t('logout')}
              </Button>
            </div>
            <div className="flex justify-center">
              <Button onClick={handleRequestAccess} outline>
                {t('requestRole')}
              </Button>
            </div>
            {error && <ErrorState error={error} />}
            {sent && <Typography>{t('requestRoleSent')}</Typography>}
          </div>
        </div>
      </FormPage>
    );
  }
  return children ?? null;
}
