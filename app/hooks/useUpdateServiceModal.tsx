import { create } from "zustand";

interface useUpdateServiceModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useUpdateServiceModal = create<useUpdateServiceModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useUpdateServiceModal;
