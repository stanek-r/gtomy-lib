import { twMerge } from 'tailwind-merge';
import { LockClosedIcon } from '@heroicons/react/24/outline';
import { LoginButton } from '@/components/auth/LoginButton';
import { useRequestAccess } from '@/utils/hooks/useRequestAccess';
import { ReactNode } from 'react';
import { PERM_ROLES, PermRoles } from '@/utils/hooks/storage/useAuthStore';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/utils/hooks/useAuth';
import { Typography } from '@/components/atoms/Typography/Typography';
import { ErrorState } from '@/components/atoms/ErrorState/ErrorState';
import { Button } from '@/components/atoms/Button/Button';
import { useConfig } from '@/utils/config/context';

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
  const { appName } = useConfig();
  const { t } = useTranslation('auth');
  const { isAuthenticated, user } = useAuth();
  const { sent, requestAccess, error, sending } = useRequestAccess(minimalRole, application);

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
        <ErrorState
          error={error}
          className={className}
          showRetry={displayRequestAccess && !sent}
          retry={requestAccess}
        />
        {endElement}
      </>
    );
  }

  const minimalRoleId = PERM_ROLES[minimalRole];
  const role = user?.roles.find((role) => role.application === (application ?? appName))?.role ?? 'user';
  const roleId = PERM_ROLES[role as PermRoles];

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
