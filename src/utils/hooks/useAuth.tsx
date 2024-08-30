import { useCallback, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useAccessTokenStore, User, useRefreshTokenStore } from '@/utils/hooks/storage/useAuthStore';
import { config } from '@/config';
import { logError } from '@/utils/sentry';
import { isTokenValid, JwtResponse, mapAccessTokenToUser } from '@/utils/auth';
import { getRefetch } from '@/utils/hooks/storage/useRefetchStore';
import { useRequest } from '@/utils/hooks/useRequest';
import { clearRequests } from '@/utils/hooks/storage';
import { showToast } from '@/components/organisms/toast';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useTranslation } from '@/utils/hooks/useTranslation';

interface UseAuth {
  isAuthenticated: boolean;
  isLoadingUser: boolean;
  token: string | undefined;
  refreshToken: string | undefined;
  user: User | undefined;
  login: (username: string, password: string, rememberLogin?: boolean) => Promise<boolean | null>;
  loginWithGoogle: (token: string, rememberLogin?: boolean) => Promise<boolean>;
  register: (username: string, password: string, email: string) => Promise<boolean>;
  logout: () => void;
  updateAccessToken: () => Promise<User | null>;
}

export function useAuth(): UseAuth {
  const { t } = useTranslation('common');
  const [accessToken, setAccessToken] = useAccessTokenStore((state) => [state.accessToken, state.setAccessToken]);
  const [refreshToken, setRefreshToken] = useRefreshTokenStore((state) => [state.refreshToken, state.setRefreshToken]);

  const user = useMemo(() => mapAccessTokenToUser(accessToken), [accessToken]);
  const { get, refresh } = useRequest(config.authUrl);

  const isLoadingUser = useMemo(() => user == null && refreshToken != null, [user, refreshToken]);

  const logout = useCallback(() => {
    setRefreshToken(undefined);
    setAccessToken(undefined);
    clearRequests();
  }, [setRefreshToken, setAccessToken, clearRequests]);

  const checkTokenValidity = useCallback(() => {
    if (getRefetch()) {
      return;
    }
    if (user == null || !isTokenValid(accessToken)) {
      if (!isTokenValid(refreshToken)) {
        logout();
        return;
      }
      refresh().then((result) => {
        if (result == null) {
          logout();
        }
      });
    }
  }, [accessToken, refreshToken, user, logout, refresh]);

  const login = useCallback(
    async (username: string, password: string, rememberLogin?: boolean): Promise<boolean | null> => {
      return axios
        .post(`${config.authUrl}/login`, {
          username,
          password,
          sendRefreshToken: !!rememberLogin,
          appName: config.appName,
        })
        .then(async (response) => {
          if (!response.data?.access_token) {
            console.error('No access token');
            return null;
          }
          setAccessToken(response.data.access_token);
          if (response.data.refresh_token && rememberLogin) {
            setRefreshToken(response.data.refresh_token);
          }
          return true;
        })
        .catch((e) => {
          if (axios.isAxiosError(e) && e.response?.status === 401) {
            return false;
          }
          logError(e);
          return null;
        });
    },
    [setAccessToken, setRefreshToken]
  );

  const loginWithGoogle = useCallback(
    async (token: string, rememberLogin?: boolean): Promise<boolean> => {
      return axios
        .post(`${config.authUrl}/google-login`, { token, sendRefreshToken: !!rememberLogin })
        .then(async (response) => {
          if (!response.data?.access_token) {
            console.error('No access token');
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
    },
    [setAccessToken, setRefreshToken]
  );

  const register = useCallback(async (username: string, password: string, email: string): Promise<boolean> => {
    return axios
      .post(`${config.authUrl}/register`, { username, password, email })
      .then(() => {
        return true;
      })
      .catch((e) => {
        logError(e);
        return false;
      });
  }, []);

  const updateAccessToken = useCallback(async (): Promise<User | null> => {
    return get<JwtResponse>('/access-token')
      .then((response) => {
        setAccessToken(response.access_token);
        return mapAccessTokenToUser(response.access_token) ?? null;
      })
      .catch(() => {
        showToast({
          message: t('state.error2'),
          icon: XMarkIcon,
          iconColor: 'error',
        });
        return null;
      });
  }, [get, setAccessToken, showToast, t]);

  useEffect(() => checkTokenValidity(), [checkTokenValidity]);

  return {
    isAuthenticated: !!user,
    isLoadingUser,
    token: accessToken,
    refreshToken: refreshToken,
    user: user,
    login,
    loginWithGoogle,
    register,
    logout,
    updateAccessToken,
  };
}
