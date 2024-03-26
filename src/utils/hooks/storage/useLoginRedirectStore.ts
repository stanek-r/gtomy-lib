import { create } from 'zustand';

export const useLoginRedirectStore = create((set) => ({
  redirectUrl: undefined,
  setRedirectUrl: (redirectUrl: string | undefined) => set(() => ({ redirectUrl: redirectUrl })),
}));
