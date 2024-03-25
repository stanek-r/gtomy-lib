import { useEffect, useMemo } from 'react';
import axios from 'axios';
import { useAccessTokenStore, User, useRefreshTokenStore } from '@/utils/hooks/storage/useAuthStore';
import { config } from '@/config';
import { logError } from '@/utils/sentry';
import { jwtDecode } from 'jwt-decode';
import { AuthDialog } from '@/components/auth/AuthDialog';
import { useDialog } from '@/utils/hooks/useDialog';
import { useRequest } from '@/utils/hooks/useRequest';

const mapAccessTokenToUser = (token?: string): User | undefined => {
  if (!token) {
    return;
  }
  try {
    return jwtDecode(token);
  } catch (e: any) {
    logError(e);
    return;
  }
};

interface UseAuth {
  isAuthenticated: boolean;
  token: string | undefined;
  refreshToken: string | undefined;
  user: User | undefined;
  login: (username: string, password: string, rememberLogin?: boolean) => Promise<boolean>;
  loginWithGoogle: (token: string) => Promise<boolean>;
  register: (username: string, password: string, email: string) => Promise<boolean>;
  logout: () => void;
  openLoginDialog: () => void;
}

export function useAuth(): UseAuth {
  const [accessToken, setAccessToken] = useAccessTokenStore((state: any) => [state.accessToken, state.setAccessToken]);
  const [refreshToken, setRefreshToken] = useRefreshTokenStore((state: any) => [
    state.refreshToken,
    state.setRefreshToken,
  ]);
  const user = useMemo(() => mapAccessTokenToUser(accessToken), [accessToken]);
  const { openDialog } = useDialog({
    id: 'auth-dialog',
    element: AuthDialog,
  });
  const { refresh } = useRequest(config.authUrl);

  useEffect(() => {
    if (!user && refreshToken) {
      refresh();
    }
  }, [user, refreshToken, refresh]);

  const login = async (username: string, password: string, rememberLogin?: boolean): Promise<boolean> => {
    return axios
      .post(`${config.authUrl}/login`, { username, password, appName: config.appName })
      .then(async (response) => {
        if (!response.data?.access_token) {
          console.error('No access token');
          return false;
        }
        const user = mapAccessTokenToUser(response.data.access_token);
        if (!user) {
          return false;
        }
        setAccessToken(response.data.access_token);
        if (response.data.refresh_token && rememberLogin) {
          setRefreshToken(response.data.refresh_token);
        }
        return true;
      })
      .catch((e) => {
        logError(e);
        return false;
      });
  };

  const loginWithGoogle = async (token: string): Promise<boolean> => {
    return axios
      .post(`${config.authUrl}/google-login`, { token })
      .then(async (response) => {
        if (!response.data?.access_token) {
          console.error('No token');
          return false;
        }
        const user = mapAccessTokenToUser(response.data.access_token);
        if (!user) {
          return false;
        }
        setAccessToken(response.data.access_token);
        return true;
      })
      .catch((e) => {
        logError(e);
        return false;
      });
  };

  const register = async (username: string, password: string, email: string): Promise<boolean> => {
    return axios
      .post(`${config.authUrl}/register`, { username, password, email })
      .then(() => {
        return true;
      })
      .catch((e) => {
        logError(e);
        return false;
      });
  };

  const logout = (): void => {
    setRefreshToken(undefined);
    setAccessToken(undefined);
  };

  return {
    isAuthenticated: !!user,
    token: accessToken,
    refreshToken: refreshToken,
    user: user,
    login,
    loginWithGoogle,
    register,
    logout: logout,
    openLoginDialog: () => openDialog('auth-dialog'),
  };
}
