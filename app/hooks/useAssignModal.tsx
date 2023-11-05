import { create } from "zustand";

interface useAssignModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useAssignModal = create<useAssignModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useAssignModal;
