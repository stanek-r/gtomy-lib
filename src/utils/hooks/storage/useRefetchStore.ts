import { create } from 'zustand';

export const useRefetchStore = create((set) => ({
  refetch: false,
  setRefetch: (refetch: boolean) => set(() => ({ refetch: refetch })),
}));

export function setRefetch(refetch: boolean): void {
  useRefetchStore.setState({ refetch: refetch });
}

export function getRefetch(): boolean {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return useRefetchStore.getState().refetch;
}
