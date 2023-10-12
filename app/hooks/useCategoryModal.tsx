import { create } from "zustand";

interface CategoryModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useCategoryModal = create<CategoryModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useCategoryModal;
