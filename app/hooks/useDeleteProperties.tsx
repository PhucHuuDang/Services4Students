import { create } from "zustand";

interface useDeletePropertiesProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useDeleteProperties = create<useDeletePropertiesProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useDeleteProperties;
