import { create } from "zustand";

interface useServicesProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useServicesModal = create<useServicesProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useServicesModal;
