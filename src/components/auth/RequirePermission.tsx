import React, { useMemo, useState } from 'react';
import { Typography } from '@/components/atoms/Typography';
import { twMerge } from 'tailwind-merge';
import { PERM_ROLES, PermRoles, Roles } from '@/utils/hooks/storage';
import { config } from '@/config';
import { useAuth, useRequest, useTranslation } from '@/utils/hooks';
import { LockClosedIcon } from '@heroicons/react/24/outline';
import { ErrorState } from '@/components/atoms/ErrorState';
import { Button } from '@/components/atoms/Button';
import { useRequestAccessStore } from '@/utils/hooks/storage/useRequestAccessStore';

export interface RequirePermissionProps {
  title?: string;
  className?: string;
  minimalRole: PermRoles;
  children?: JSX.Element;
  application?: string;
  displayWarning?: boolean;
  displayRequestAccess?: boolean;
}

export function RequirePermission({
  title,
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
  const [requests, addRequest] = useRequestAccessStore((state: any) => [state.requests, state.addRequest]);
  const sent = useMemo(
    () =>
      requests.find(
        (request: Roles) => request.role === minimalRole && request.application === (application ?? config.appName)
      ) != null,
    [requests, minimalRole, application]
  );

  const minimalRoleId = PERM_ROLES[minimalRole];
  const role = user?.roles.find((role) => role.application === (application ?? config.appName))?.role ?? 'user';
  const roleId = PERM_ROLES[role as PermRoles];

  const handleRequestAccess = () => {
    if (!isAuthenticated) {
      return;
    }
    const request = {
      application: application ?? config.appName,
      role: minimalRole,
    } as Roles;
    put('/request-access', request)
      .then(() => {
        setError(null);
        addRequest(request);
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
          {title ?? t('noPermission.title')}
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
