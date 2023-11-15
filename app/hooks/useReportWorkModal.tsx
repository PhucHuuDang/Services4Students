import { create } from "zustand";

interface useReportWorkModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useReportWorkModal = create<useReportWorkModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useReportWorkModal;
