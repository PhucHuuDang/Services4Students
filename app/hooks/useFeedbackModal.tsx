import { create } from "zustand";

interface useFeedbackModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useFeedbackModal = create<useFeedbackModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useFeedbackModal;
