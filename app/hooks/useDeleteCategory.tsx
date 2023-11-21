import { create } from "zustand";

interface useDeleteCategory {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useDeleteCategory = create<useDeleteCategory>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useDeleteCategory;
