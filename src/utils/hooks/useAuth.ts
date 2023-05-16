import axios from 'axios';
import { useAuthStore, User } from './storage/useAuthStore';
import { HttpClient } from '../auth';

interface UseAuth {
  isAuthenticated: boolean;
  token: string | undefined;
  user: User | undefined;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, password: string, email: string) => Promise<boolean>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

export function useAuth(): UseAuth {
  const [token, setToken, user, setUser, reset] = useAuthStore((state: any) => [
    state.token,
    state.setToken,
    state.user,
    state.setUser,
    state.reset,
  ]);

  const login = async (username: string, password: string): Promise<boolean> => {
    return axios
      .post('https://auth.gtomy.net/login', { username, password })
      .then(async (response) => {
        if (!response.data?.access_token) {
          console.error('No access token');
          return false;
        }
        setToken(response.data.access_token);
        await refreshUser(response.data.access_token);
        return true;
      })
      .catch(() => {
        return false;
      });
  };

  const register = async (username: string, password: string, email: string): Promise<boolean> => {
    return axios
      .post('https://auth.gtomy.net/register', { username, password, email })
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  };

  const refreshUser = async (forceToken?: string): Promise<void> => {
    const client = new HttpClient({ token: forceToken ?? token });
    return client
      .get<User>('https://auth.gtomy.net/profile')
      .then((user) => {
        setUser(user);
      })
      .catch();
  };

  return {
    isAuthenticated: !!user,
    token: token,
    user: user,
    login,
    register,
    logout: reset,
    refreshUser,
  };
}
