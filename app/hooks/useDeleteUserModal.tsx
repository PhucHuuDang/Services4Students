import { create } from "zustand";

interface useDeleteUserModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useDeleteUserModal = create<useDeleteUserModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useDeleteUserModal;
