import { create } from "zustand";

interface RegisterStaffModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useRegisterStaffModal = create<RegisterStaffModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useRegisterStaffModal;
