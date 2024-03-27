import { useEffect, useMemo, useRef } from 'react';
import axios from 'axios';
import { useAccessTokenStore, User, useRefreshTokenStore } from '@/utils/hooks/storage/useAuthStore';
import { config } from '@/config';
import { logError } from '@/utils/sentry';
import { AuthDialog } from '@/components/auth/AuthDialog';
import { DialogElementType, useDialog } from '@/utils/hooks/useDialog';
import { useRequest } from '@/utils/hooks/useRequest';
import { mapAccessTokenToUser } from '@/utils/auth';

interface UseAuth {
  isAuthenticated: boolean;
  token: string | undefined;
  refreshToken: string | undefined;
  user: User | undefined;
  login: (username: string, password: string, rememberLogin?: boolean) => Promise<boolean | null>;
  loginWithGoogle: (token: string) => Promise<boolean>;
  register: (username: string, password: string, email: string) => Promise<boolean>;
  logout: () => void;
  openLoginDialog: () => void;
  AuthDialogElement: DialogElementType;
}

export function useAuth(): UseAuth {
  const [accessToken, setAccessToken] = useAccessTokenStore((state: any) => [state.accessToken, state.setAccessToken]);
  const [refreshToken, setRefreshToken] = useRefreshTokenStore((state: any) => [
    state.refreshToken,
    state.setRefreshToken,
  ]);
  const user = useMemo(() => mapAccessTokenToUser(accessToken), [accessToken]);
  const { openDialog, DialogElement } = useDialog(AuthDialog);
  const { refresh } = useRequest(config.authUrl);
  const refetchRef = useRef<boolean>(false);

  useEffect(() => {
    if (!user && refreshToken && refetchRef.current === false) {
      refetchRef.current = true;
      refresh().then(() => {
        refetchRef.current = false;
      });
    }
  }, [user, refreshToken, refresh]);

  const login = async (username: string, password: string, rememberLogin?: boolean): Promise<boolean | null> => {
    return axios
      .post(`${config.authUrl}/login`, { username, password, appName: config.appName })
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
  };

  const loginWithGoogle = async (token: string): Promise<boolean> => {
    return axios
      .post(`${config.authUrl}/google-login`, { token })
      .then(async (response) => {
        if (!response.data?.access_token) {
          console.error('No access token');
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
    openLoginDialog: () => openDialog(),
    AuthDialogElement: DialogElement,
  };
}
