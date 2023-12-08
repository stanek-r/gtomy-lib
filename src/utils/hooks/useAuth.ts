import { useMemo } from 'react';
import axios from 'axios';
import { useAuthStore, User } from './storage/useAuthStore';
import { config } from '../../config';
import { logError } from '../sentry';
import { jwtDecode } from 'jwt-decode';

const mapTokenToUser = (token?: string): User | undefined => {
  if (!token) {
    return;
  }
  try {
    const decodedToken: User = jwtDecode(token);
    const expirationDate = new Date(decodedToken.exp * 1000);
    const currentDate = new Date();
    if (expirationDate < currentDate) {
      return;
    }
    return decodedToken;
  } catch (e: any) {
    logError(e);
    return;
  }
};

interface UseAuth {
  isAuthenticated: boolean;
  token: string | undefined;
  user: User | undefined;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, password: string, email: string) => Promise<boolean>;
  logout: () => void;
}

export function useAuth(): UseAuth {
  const [token, setToken] = useAuthStore((state: any) => [state.token, state.setToken]);
  const user = useMemo(() => mapTokenToUser(token), [token]);

  const login = async (username: string, password: string): Promise<boolean> => {
    return axios
      .post(`${config.authUrl}/login`, { username, password })
      .then(async (response) => {
        if (!response.data?.access_token) {
          console.error('No access token');
          return false;
        }
        const user = mapTokenToUser(response.data.access_token);
        if (!user) {
          return false;
        }
        setToken(response.data.access_token);
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
    setToken(undefined);
  };

  return {
    isAuthenticated: !!user,
    token: token,
    user: user,
    login,
    register,
    logout: logout,
  };
}
