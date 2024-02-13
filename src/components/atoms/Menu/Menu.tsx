import React, { ReactNode } from 'react';
import { config } from '@/config';
import { Link, useNavigate } from 'react-router-dom';
import { getUserProfileImageId, useAuth, useBreakpoint } from '@/utils';
import { useTranslation } from '@/utils/hooks/useTranslation';
import { getUserFirstChar } from '@/utils/auth/userUtils';
import { Button } from '@/components/atoms/Button';
import { ButtonIcon } from '@/components/atoms/ButtonIcon';
import { UserIcon } from '@heroicons/react/24/outline';
import { CloudflareImage } from '@/components/atoms/CloudflareImage/CloudflareImage';

export interface MenuProps {
  children?: ReactNode;
  showAuth?: boolean;
  authDialog?: boolean;
  bottomMenuActions?: ReactNode;
  dropdownActions?: ReactNode;
  showIcon?: boolean;
}

export function Menu({ children, showAuth, authDialog, showIcon, bottomMenuActions, dropdownActions }: MenuProps) {
  const { isAuthenticated, user, logout, openLoginDialog } = useAuth();
  const { t } = useTranslation('auth');
  const { isOverBreakpoint } = useBreakpoint('lg');
  const navigate = useNavigate();

  const login = () => {
    if (authDialog) {
      openLoginDialog();
    } else {
      navigate('/login');
    }
  };

  if (isOverBreakpoint) {
    return (
      <div className="navbar bg-neutral text-neutral-content">
        <div className="flex-1">
          {config.appDisplayName && (
            <Link className="btn btn-ghost text-xl" to="/">
              {showIcon && <img src="/favicon.ico" className="mr-2 size-8 rounded" alt="Favicon" />}
              {config.appDisplayName}
            </Link>
          )}
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal gap-2 px-1">{children}</ul>
          {showAuth && (
            <>
              {isAuthenticated ? (
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="avatar btn btn-circle btn-ghost">
                    <div className="w-10 rounded-full">
                      <CloudflareImage
                        imageId={getUserProfileImageId(user)}
                        alt={getUserFirstChar(user)}
                        srcType="profile"
                        className="size-10"
                        visibleByDefault
                      />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-neutral p-2 shadow"
                  >
                    <li>
                      {dropdownActions}
                      <button type="button" onClick={logout}>
                        {t('logout')}
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <Button onClick={login}>{t('login')}</Button>
              )}
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="navbar bg-neutral text-neutral-content">
        {children && (
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-circle btn-ghost">
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
                className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-neutral p-2 shadow"
              >
                {children}
              </ul>
            </div>
          </div>
        )}
        <div className={children ? 'navbar-center' : 'navbar-start'}>
          <Link className="btn btn-ghost text-xl" to="/">
            {showIcon && <img src="/favicon.ico" className="mr-2 size-8 rounded" alt="Favicon" />}
            {config.appDisplayName}
          </Link>
        </div>
        <div className="navbar-end">
          {showAuth && (
            <>
              {isAuthenticated ? (
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="avatar btn btn-circle btn-ghost">
                    <div className="w-10 rounded-full">
                      <CloudflareImage
                        imageId={getUserProfileImageId(user)}
                        alt={getUserFirstChar(user)}
                        srcType="profile"
                        className="size-10"
                        visibleByDefault
                      />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-neutral p-2 shadow"
                  >
                    <li>
                      {dropdownActions}
                      <button type="button" onClick={logout}>
                        {t('logout')}
                      </button>
                    </li>
                  </ul>
                </div>
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
