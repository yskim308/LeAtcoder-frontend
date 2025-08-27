import { create } from "zustand";
import { persist } from "zustand/middleware";

type TokenStore = { token: string | null; setToken: (t: string | null) => void; clearToken: () => void; };

export const useTokenStore = create<TokenStore>()(
  persist(
    (set) => ({
      token: null,
      setToken: (t) => set({ token: t }),
      clearToken: () => set({ token: null }),
    }),
    { name: "access-token", partialize: (s) => ({ token: s.token }) }
  )
);