import { create } from "zustand";

interface useReviewFeedbackModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useReviewFeedbackModal = create<useReviewFeedbackModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useReviewFeedbackModal;
