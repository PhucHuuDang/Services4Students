import { create } from "zustand";

interface useTokenStoreProps {
  token: string | null;
  setToken: (newToken: string) => void;
  clearToken: () => void;
  getToken?: () => void;
}

const useTokenStore = create<useTokenStoreProps>((set) => ({
  token: null,

  setToken: (newToken) => set({ token: newToken }),

  clearToken: () => set({ token: null }),

  //   getToken: () => token,
}));

export default useTokenStore;
