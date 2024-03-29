import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { Roles } from '@/utils/hooks/storage/useAuthStore';

export const useRequestAccessStore = create(
  persist(
    (set) => ({
      requests: [],
      addRequest: (request: Roles) => set((prev: Roles[]) => ({ requests: [...prev, request] })),
      clearRequests: () => set(() => ({ requests: [] })),
    }),
    {
      name: 'requests-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export function clearRequests() {
  useRequestAccessStore.setState({ requests: [] });
}
