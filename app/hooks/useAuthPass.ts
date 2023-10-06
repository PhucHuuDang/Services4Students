import { create } from "zustand";

interface useAuthPassProps {
  password: string;
  setPasswordTrue: (value: string) => void;
  setPasswordFalse: () => void;
}

const useAuthPass = create<useAuthPassProps>((set) => ({
  password: "",
  setPasswordTrue: (value) => set({ password: value }),
  setPasswordFalse: () => set({ password: "" }),
}));

export default useAuthPass;
