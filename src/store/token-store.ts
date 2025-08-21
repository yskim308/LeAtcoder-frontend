import { create } from "zustand";

interface TokenStore {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
}
export const useTokenStore = create<TokenStore>((set) => ({
  token: null,
  setToken: (token: string) => set({ token: token }),
  clearToken: () => set({ token: null }),
}));
