import { create } from "zustand";

interface useStoreBookingProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useStoreBooking = create<useStoreBookingProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useStoreBooking;
