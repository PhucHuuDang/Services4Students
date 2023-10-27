"use client";

import { PackageProps } from "@/app/types";
import { createContext, useContext, useState } from "react";

interface BookingContextValue {
  storeBookingData: PackageProps[];
  setStoreBookingData: React.Dispatch<React.SetStateAction<PackageProps[]>>;
}
const BookingContext = createContext<BookingContextValue | undefined>(
  undefined
);

interface BookingProviderProps {
  children: React.ReactNode;
}

export function BookingProvider({ children }: BookingProviderProps) {
  const [storeBookingData, setStoreBookingData] = useState<PackageProps[]>([]);

  return (
    <BookingContext.Provider value={{ storeBookingData, setStoreBookingData }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}
