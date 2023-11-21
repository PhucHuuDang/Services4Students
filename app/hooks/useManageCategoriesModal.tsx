import { create } from "zustand";

interface useManageCategoriesModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useManageCategoriesModal = create<useManageCategoriesModalProps>(
  (set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  })
);

export default useManageCategoriesModal;
