import { create } from "zustand";

interface useAddServiceModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useAddServiceModal = create<useAddServiceModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useAddServiceModal;
