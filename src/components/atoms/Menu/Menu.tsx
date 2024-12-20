import { ReactNode, useCallback } from 'react';
import { UserIcon } from '@heroicons/react/24/outline';
import { ProfileImage } from '@/components/auth/ProfileImage';
import { Icon, IconType } from '@/components/atoms/Icon/Icon';
import { useAuth } from '@/utils/hooks/useAuth';
import { useDialog } from '@/utils/hooks/useDialog';
import { AuthDialog } from '@/components/auth/AuthDialog';
import { useTranslation } from 'react-i18next';
import { useBreakpoint } from '@/utils/hooks/useBreakpoint';
import { useLoginRedirectStore } from '@/utils/hooks/storage/useLoginRedirectStore';
import { DialogElement } from '@/components/organisms/dialog/DialogElement';
import { LoadingState } from '@/components/atoms/LoadingState/LoadingState';
import { Button } from '@/components/atoms/Button/Button';
import { Typography } from '@/components/atoms/Typography/Typography';
import { ButtonIcon } from '@/components/atoms/ButtonIcon/ButtonIcon';
import { useConfig } from '@/utils/config/context';

const AppIcon = <img src="/favicon.ico" className="mr-2 size-8 shrink-0 rounded" alt="Application icon" />;

export interface MenuProps {
  children?: ReactNode;
  showAuth?: boolean;
  bottomMenuActions?: ReactNode;
  dropdownActions?: ReactNode;
  showIcon?: boolean;
  icon?: IconType;
}

export function Menu({ children, showAuth, showIcon, bottomMenuActions, dropdownActions, icon = AppIcon }: MenuProps) {
  const { user, isAuthenticated, logout, isLoadingUser } = useAuth();
  const { appDisplayName, navigate } = useConfig();
  const { openDialog, dialogElementProps } = useDialog(AuthDialog);
  const { t } = useTranslation('auth');
  const { isOverBreakpoint } = useBreakpoint('lg');
  const [setRedirectUrl] = useLoginRedirectStore((state) => [state.setRedirectUrl]);

  const login = useCallback(() => {
    if (isOverBreakpoint || navigate == null) {
      openDialog();
    } else {
      setRedirectUrl(window.location.pathname);
      navigate('/login');
    }
  }, [isOverBreakpoint, openDialog, setRedirectUrl, navigate]);

  const onLogoClick = useCallback(() => {
    navigate?.('/');
  }, [navigate]);

  if (isOverBreakpoint) {
    return (
      <>
        <DialogElement {...dialogElementProps} />
        <div className="navbar bg-neutral text-neutral-content">
          <div className="flex-1">
            {appDisplayName && (
              <button type="button" onClick={onLogoClick} className="btn btn-ghost text-xl">
                {showIcon && <Icon icon={icon} size="xl" className="mr-2" />}
                {appDisplayName}
              </button>
            )}
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal gap-2 px-1">{children}</ul>
            {showAuth && (
              <>
                {children && <div className="divider divider-horizontal ml-1 mr-3 py-2"></div>}
                {isAuthenticated ? (
                  <>
                    <div className=" mr-3">{user?.displayName}</div>
                    <div className="dropdown dropdown-end">
                      <div tabIndex={0} role="button" className="avatar btn btn-circle btn-ghost">
                        <div className="w-10 rounded-full">
                          <ProfileImage className="size-10" />
                        </div>
                      </div>
                      <ul
                        tabIndex={0}
                        className="menu dropdown-content z-[1] mt-3 w-52 rounded-box bg-neutral p-2 shadow"
                      >
                        <li>
                          {dropdownActions}
                          <button type="button" onClick={logout}>
                            {t('logout')}
                          </button>
                        </li>
                      </ul>
                    </div>
                  </>
                ) : isLoadingUser ? (
                  <LoadingState showLoading size="md" layout="row" className="mr-4" />
                ) : (
                  <Button onClick={login} color="primary">
                    {t('login')}
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <DialogElement {...dialogElementProps} />
      <div className="navbar bg-neutral text-neutral-content">
        {children && (
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-circle btn-ghost" title="Menu">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu dropdown-content menu-md z-[1] mt-3 w-52 rounded-box bg-neutral p-2 shadow"
              >
                {children}
              </ul>
            </div>
          </div>
        )}
        <div className={children ? 'navbar-center' : 'navbar-start'}>
          <button type="button" onClick={onLogoClick} className="btn btn-ghost text-xl">
            {showIcon && <Icon icon={icon} size="xl" className="mr-2" />}
            {appDisplayName}
          </button>
        </div>
        <div className="navbar-end">
          {showAuth && (
            <>
              {isAuthenticated ? (
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="avatar btn btn-circle btn-ghost">
                    <div className="w-10 rounded-full">
                      <ProfileImage className="size-10" />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu dropdown-content menu-md z-[1] mt-3 w-52 rounded-box bg-neutral p-2 shadow"
                  >
                    <Typography className="pt-2 text-center" weight="medium">
                      {user?.displayName}
                    </Typography>
                    <div className="divider my-1"></div>
                    <li>
                      {dropdownActions}
                      <button type="button" onClick={logout}>
                        {t('logout')}
                      </button>
                    </li>
                  </ul>
                </div>
              ) : isLoadingUser ? (
                <LoadingState size="md" showLoading hideMessage className="mr-3" />
              ) : (
                <ButtonIcon icon={UserIcon} color="ghost" onClick={login} title={t('login')} />
              )}
            </>
          )}
        </div>
      </div>
      {bottomMenuActions && <div className="btm-nav bg-neutral text-neutral-content">{bottomMenuActions}</div>}
    </>
  );
}
