import React, { ReactNode } from 'react';
import { config } from '@/config';
import { Link } from 'react-router-dom';
import { useAuth, useBreakpoint } from '@/utils';
import { useTranslation } from '@/utils/hooks/useTranslation';
import { getUserFirstChar, getUserProfileImageUrl } from '@/utils/auth/userUtils';
import { Button } from '@/components/atoms/Button';

export interface MenuProps {
  children?: ReactNode;
  showAuth?: boolean;
}

export function Menu({ children, showAuth }: MenuProps) {
  const { isAuthenticated, user, logout, openLoginDialog } = useAuth();
  const { t } = useTranslation('auth');
  const { isOverBreakpoint } = useBreakpoint('lg');

  if (isOverBreakpoint) {
    return (
      <div className="navbar bg-neutral">
        <div className="flex-1">
          {config.appName && (
            <Link className="btn btn-ghost text-xl" to="/">
              {config.appName}
            </Link>
          )}
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">{children}</ul>
          {showAuth && (
            <>
              {isAuthenticated ? (
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="avatar btn btn-circle btn-ghost">
                    <div className="w-10 rounded-full">
                      <img alt={getUserFirstChar(user)} src={getUserProfileImageUrl(user)} />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-neutral p-2 shadow"
                  >
                    <li>
                      <button type="button" onClick={logout}>
                        {t('logout')}
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <Button onClick={openLoginDialog}>{t('login')}</Button>
              )}
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="navbar bg-neutral lg:bg-amber-400">
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
          <ul tabIndex={0} className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-neutral p-2 shadow">
            {children}
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        {config.appName && (
          <Link className="btn btn-ghost text-xl" to="/">
            {config.appName}
          </Link>
        )}
      </div>
      <div className="navbar-end">
        {showAuth && (
          <>
            {isAuthenticated ? (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="avatar btn btn-circle btn-ghost">
                  <div className="w-10 rounded-full">
                    <img alt={getUserFirstChar(user)} src={getUserProfileImageUrl(user)} />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-neutral p-2 shadow"
                >
                  <li>
                    <button type="button" onClick={logout}>
                      {t('logout')}
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Button onClick={openLoginDialog}>{t('login')}</Button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
