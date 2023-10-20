import { create } from "zustand";

interface useComboModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useComboModal = create<useComboModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useComboModal;
