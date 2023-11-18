import { create } from "zustand";

interface useDeleteComboConfirmProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useDeleteComboConfirm = create<useDeleteComboConfirmProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useDeleteComboConfirm;
