import { create } from "zustand";

interface useUpdateComboModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useUpdateComboModal = create<useUpdateComboModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useUpdateComboModal;
