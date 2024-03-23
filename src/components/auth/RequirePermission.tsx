import React, { useState } from 'react';
import { Typography } from '@/components/atoms/Typography';
import { twMerge } from 'tailwind-merge';
import { PERM_ROLES, PermRoles, Roles } from '@/utils/hooks/storage';
import { config } from '@/config';
import { useAuth, useRequest, useTranslation } from '@/utils/hooks';
import { LockClosedIcon } from '@heroicons/react/24/outline';
import { ErrorState } from '@/components/atoms/ErrorState';
import { Button } from '@/components/atoms/Button';

export interface RequirePermissionProps {
  className?: string;
  minimalRole: PermRoles;
  children?: JSX.Element;
  application?: string;
  displayWarning?: boolean;
  displayRequestAccess?: boolean;
}

export function RequirePermission({
  className,
  children,
  minimalRole,
  application,
  displayWarning,
  displayRequestAccess,
}: RequirePermissionProps): JSX.Element | null {
  const { t } = useTranslation('auth');
  const { isAuthenticated, user } = useAuth();
  const { put } = useRequest(config.authUrl);
  const [error, setError] = useState<any | null>(null);
  const [sent, setSent] = useState<boolean>(false);

  const minimalRoleId = PERM_ROLES[minimalRole];
  const role = user?.roles.find((role) => role.application === (application ?? config.appName))?.role ?? 'user';
  const roleId = PERM_ROLES[role as PermRoles];

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
  if (error) {
    return <ErrorState error={error} className={className} />;
  }
  if (roleId < minimalRoleId) {
    if (!displayWarning) {
      return null;
    }
    return (
      <div role="alert" className={twMerge('alert alert-warning', className)}>
        <LockClosedIcon className="size-8" />
        <Typography size="xl" color="warning">
          {t('noAccess.title')}
        </Typography>
        {displayRequestAccess &&
          (sent ? (
            <Typography color="warning">{t('requestRoleSent')}</Typography>
          ) : (
            <Button onClick={handleRequestAccess}>{t('requestRole')}</Button>
          ))}
      </div>
    );
  }
  return children ?? null;
}
