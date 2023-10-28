"use client";

import { PackageProps } from "@/app/types";
import { createContext, useContext, useEffect, useState } from "react";

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

// const cartStored = JSON.parse(localStorage.getItem("cart") || "[]");

export function BookingProvider({ children }: BookingProviderProps) {
  // const [storeBookingData, setStoreBookingData] = useState<PackageProps[]>([]);
  //   const [storeBookingData, setStoreBookingData] =
  //     useState<PackageProps[]>(cartStored);

  // Initialize storeBookingData state with an empty array
  const [storeBookingData, setStoreBookingData] = useState<PackageProps[]>([]);

  // Load data from localStorage when the component mounts (client-side)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const cartStored = JSON.parse(localStorage.getItem("cart") || "[]");
      setStoreBookingData(cartStored);
    }
  }, []);

  // Save changes to localStorage whenever storeBookingData is updated
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(storeBookingData));
    }
  }, [storeBookingData]);

  //   console.log(cartStored);

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
