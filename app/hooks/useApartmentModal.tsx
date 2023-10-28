import { create } from "zustand";

interface useApartmentModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useApartmentModal = create<useApartmentModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useApartmentModal;
