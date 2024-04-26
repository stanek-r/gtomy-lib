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
import { ReactNode } from 'react';

export interface RequirePermissionProps {
  title?: string;
  className?: string;
  minimalRole?: PermRoles;
  children?: JSX.Element;
  application?: string;
  displayWarning?: boolean;
  displayLogin?: boolean;
  displayRequestAccess?: boolean;
  startElement?: ReactNode;
  endElement?: ReactNode;
}

export function RequirePermission({
  title,
  className,
  children,
  minimalRole = 'user',
  application,
  displayWarning,
  displayLogin,
  displayRequestAccess,
  startElement,
  endElement,
}: RequirePermissionProps): JSX.Element | null {
  const { t } = useTranslation('auth');
  const { isAuthenticated, user } = useAuth();
  const { sent, requestAccess, error, sending } = useRequestAccess(minimalRole, application);

  const minimalRoleId = PERM_ROLES[minimalRole];
  const role = user?.roles.find((role) => role.application === (application ?? config.appName))?.role ?? 'user';
  const roleId = PERM_ROLES[role as PermRoles];

  if (!isAuthenticated) {
    if (!displayLogin) {
      return null;
    }
    return (
      <>
        {startElement}
        <div className={twMerge('flex flex-col gap-4 justify-center items-center', className)}>
          <Typography size="2xl" weight="semibold">
            {title ?? t('noLogin.title')}
          </Typography>
          <LoginButton />
        </div>
        {endElement}
      </>
    );
  }
  if (error) {
    return (
      <>
        {startElement}
        <ErrorState error={error} className={className} />
        {endElement}
      </>
    );
  }
  if (roleId < minimalRoleId) {
    if (!displayWarning) {
      return null;
    }
    return (
      <>
        {startElement}
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
        {endElement}
      </>
    );
  }
  return (
    <>
      {startElement}
      {children}
      {endElement}
    </>
  );
}
