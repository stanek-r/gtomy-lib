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
                  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                      <img alt={getUserFirstChar(user)} src={getUserProfileImageUrl(user)} />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-neutral rounded-box w-52"
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
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-neutral rounded-box w-52">
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
      {showAuth && (
        <>
          {isAuthenticated ? (
            <div className="navbar-end">
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img alt={getUserFirstChar(user)} src={getUserProfileImageUrl(user)} />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-neutral rounded-box w-52"
                >
                  <li>
                    <button type="button" onClick={logout}>
                      {t('logout')}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="navbar-end">
              <Button onClick={openLoginDialog}>{t('login')}</Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
