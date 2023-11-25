import { create } from "zustand";

interface useFormAttendanceProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useFormAttendance = create<useFormAttendanceProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useFormAttendance;
