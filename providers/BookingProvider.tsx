"use client";

import { PackageProps } from "@/app/types";
import { ServiceProp } from "@/app/types";
import { createContext, useContext, useEffect, useState } from "react";

interface BookingContextValue {
  storeBookingData: PackageProps[];
  setStoreBookingData: React.Dispatch<React.SetStateAction<PackageProps[]>>;

  servicesBooked: ServiceProp[];
  setServicesBooked: React.Dispatch<React.SetStateAction<ServiceProp[]>>;
}
const BookingContext = createContext<BookingContextValue | undefined>(
  undefined
);

interface BookingProviderProps {
  children: React.ReactNode;
}

// const cartStored = JSON.parse(localStorage.getItem("cart") || "[]");

export function BookingProvider({ children }: BookingProviderProps) {
  // Initialize storeBookingData state with an empty array
  const [storeBookingData, setStoreBookingData] = useState<PackageProps[]>([]);
  const [servicesBooked, setServicesBooked] = useState<ServiceProp[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cartStored = JSON.parse(localStorage.getItem("cart") || "[]");
      setStoreBookingData(cartStored);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(storeBookingData));
    }
  }, [storeBookingData]);

  // services booked

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cartStored = JSON.parse(
        localStorage.getItem("serviceCart") || "[]"
      );
      setServicesBooked(cartStored);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("serviceCart", JSON.stringify(servicesBooked));
    }
  }, [servicesBooked]);

  return (
    <BookingContext.Provider
      value={{
        storeBookingData,
        setStoreBookingData,
        servicesBooked,
        setServicesBooked,
      }}
    >
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
