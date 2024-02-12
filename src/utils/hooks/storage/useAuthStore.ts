import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const PERM_ROLES = {
  user: 0,
  subscriber: 1,
  moderator: 2,
  admin: 3,
  owner: 4,
};

export type PermRoles = keyof typeof PERM_ROLES;

export interface Roles {
  application: string;
  role: PermRoles;
}

export interface User {
  userId: string;
  username: string;
  email: string;
  emailVerified: boolean;
  roles: Roles[];
  displayName: string;
  profileImageId?: string;

  // JWT
  iat: number;
  exp: number;
}

export const useAuthStore = create(
  persist(
    (set) => ({
      token: undefined,
      setToken: (token: string | undefined) => set(() => ({ token: token })),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
