import axios from 'axios';
import useAuthStore, { User } from './storage/useAuthStore';

interface UseAuth {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
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
      .then((response) => {
        if (!response.data?.access_token) {
          console.error('No access token');
          return false;
        }
        setToken(response.data.access_token);
        refreshUser();
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  };

  const refreshUser = async (): Promise<void> => {
    return axios
      .get<User>('https://auth.gtomy.net/profile')
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return {
    isAuthenticated: !!user,
    token: token,
    user: user,
    login,
    logout: reset,
    refreshUser,
  };
}
