import { create } from "zustand";

interface useCreateAttendanceModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useCreateAttendanceModal = create<useCreateAttendanceModalProps>(
  (set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  })
);

export default useCreateAttendanceModal;
