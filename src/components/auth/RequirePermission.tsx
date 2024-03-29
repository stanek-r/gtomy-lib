import React from 'react';
import { Typography } from '@/components/atoms/Typography';
import { twMerge } from 'tailwind-merge';
import { PERM_ROLES, PermRoles } from '@/utils/hooks/storage';
import { config } from '@/config';
import { useAuth, useTranslation } from '@/utils/hooks';
import { LockClosedIcon } from '@heroicons/react/24/outline';
import { ErrorState } from '@/components/atoms/ErrorState';
import { Button } from '@/components/atoms/Button';
import { LoginButton } from '@/components/auth/LoginButton';
import { useRequestAccess } from '@/utils/hooks/useRequestAccess';

export interface RequirePermissionProps {
  title?: string;
  className?: string;
  minimalRole: PermRoles;
  children?: JSX.Element;
  application?: string;
  displayWarning?: boolean;
  displayRequestAccess?: boolean;
  displayLoginInDialog?: boolean;
}

export function RequirePermission({
  title,
  className,
  children,
  minimalRole,
  application,
  displayWarning,
  displayRequestAccess,
  displayLoginInDialog,
}: RequirePermissionProps): JSX.Element | null {
  const { t } = useTranslation('auth');
  const { isAuthenticated, user } = useAuth();
  const { sent, requestAccess, error, sending } = useRequestAccess(minimalRole, application);

  const minimalRoleId = PERM_ROLES[minimalRole];
  const role = user?.roles.find((role) => role.application === (application ?? config.appName))?.role ?? 'user';
  const roleId = PERM_ROLES[role as PermRoles];

  if (!isAuthenticated) {
    if (!displayWarning) {
      return null;
    }
    return (
      <div className={twMerge('flex justify-center items-center', className)}>
        <LoginButton authDialog={displayLoginInDialog} />
      </div>
    );
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
            <Button onClick={requestAccess} disabled={sending}>
              {t('requestRole')}
            </Button>
          ))}
      </div>
    );
  }
  return children ?? null;
}
