import { FunctionComponent, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLoginRedirectStore } from '@/utils/hooks/storage/useLoginRedirectStore';
import { useRequestAccess } from '@/utils/hooks/useRequestAccess';
import { PERM_ROLES, PermRoles } from '@/utils/hooks/storage/useAuthStore';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/utils/hooks/useAuth';
import { ColumnPage } from '@/components/layout/ColumnPage';
import { LoadingState } from '@/components/atoms/LoadingState/LoadingState';
import { Typography } from '@/components/atoms/Typography/Typography';
import { Button } from '@/components/atoms/Button/Button';
import { ErrorState } from '@/components/atoms/ErrorState/ErrorState';
import { useConfig } from '@/utils/ConfigProvider';

export interface RequireAuthProps {
  MenuComponent?: FunctionComponent | JSX.Element;
  FooterComponent?: FunctionComponent | JSX.Element;
  minimalRole?: PermRoles;
  children?: JSX.Element;
  application?: string;
  displayRequestAccess?: boolean;
}

export function RequireAuth({
  MenuComponent,
  FooterComponent,
  minimalRole = 'user',
  children,
  application,
  displayRequestAccess,
}: RequireAuthProps): JSX.Element | null {
  const { t } = useTranslation('auth');
  const { isAuthenticated, user, logout, refreshToken } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [setRedirectUrl] = useLoginRedirectStore((state) => [state.setRedirectUrl]);
  const { sent, requestAccess, error, sending } = useRequestAccess(minimalRole, application);
  const { appName } = useConfig();

  useEffect(() => {
    if (!isAuthenticated && !refreshToken) {
      setRedirectUrl(pathname);
      navigate('/login');
    }
  }, [pathname, isAuthenticated, navigate, refreshToken, setRedirectUrl]);

  if (!isAuthenticated) {
    return (
      <ColumnPage MenuComponent={MenuComponent} FooterComponent={FooterComponent}>
        <LoadingState showLoading className="flex-1 justify-center" />
      </ColumnPage>
    );
  }

  const minimalRoleId = PERM_ROLES[minimalRole];
  const role = user?.roles.find((role) => role.application === (application ?? appName))?.role ?? 'user';
  const roleId = PERM_ROLES[role as PermRoles];

  if (roleId < minimalRoleId) {
    return (
      <ColumnPage MenuComponent={MenuComponent} FooterComponent={FooterComponent}>
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
            {displayRequestAccess && (
              <div className="flex justify-center">
                <Button onClick={requestAccess} outline disabled={sending}>
                  {t('requestRole')}
                </Button>
              </div>
            )}
            {error && <ErrorState error={error} />}
            {sent && <Typography className="text-center">{t('requestRoleSent')}</Typography>}
          </div>
        </div>
      </ColumnPage>
    );
  }
  return children ?? null;
}
