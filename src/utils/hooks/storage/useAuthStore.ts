import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const PERM_ROLES = {
  user: 0,
  vip: 1,
  moderator: 2,
  admin: 3,
  owner: 4,
};

export type PermRoles = 'user' | 'vip' | 'moderator' | 'admin' | 'owner';

export interface Roles {
  application: string;
  role: PermRoles;
}

export interface User {
  userId: string;
  googleId?: string;
  username: string;
  email: string;
  emailVerified: boolean;
  roles: Roles[];
  displayName: string;
  profileImageId?: string;
  profileImageUrl?: string;

  // JWT
  iat: number;
  exp: number;
}

interface AccessTokenStore {
  accessToken: string | undefined;
  setAccessToken: (token: string | undefined) => void;
}

export const useAccessTokenStore = create(
  persist<AccessTokenStore>(
    (set) => ({
      accessToken: undefined,
      setAccessToken: (accessToken: string | undefined) => set(() => ({ accessToken: accessToken })),
    }),
    {
      name: 'access-token-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export function getAccessToken(): string | undefined {
  return useAccessTokenStore.getState().accessToken;
}

export function setAccessToken(token: string | undefined): void {
  useAccessTokenStore.setState({ accessToken: token });
}

interface RefreshTokenStore {
  refreshToken: string | undefined;
  setRefreshToken: (token: string | undefined) => void;
}

export const useRefreshTokenStore = create(
  persist<RefreshTokenStore>(
    (set) => ({
      refreshToken: undefined,
      setRefreshToken: (refreshToken: string | undefined) => set(() => ({ refreshToken: refreshToken })),
    }),
    {
      name: 'refresh-token-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export function getRefreshToken(): string | undefined {
  return useRefreshTokenStore.getState().refreshToken;
}

export function setRefreshToken(token?: string): void {
  useRefreshTokenStore.setState({ refreshToken: token });
}
