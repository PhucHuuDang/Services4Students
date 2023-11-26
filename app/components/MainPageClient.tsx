"use client";

import { toast } from "react-hot-toast";
import { BsCartCheck } from "react-icons/bs";

import { useCallback, useEffect, useState } from "react";
import { ServiceProp } from "../types";
import ClientOnly from "./ClientOnly";
import Container from "./Container";
import ListingCard from "./inputs/ListingCard";
import Banner from "./navbar/Banner";
import { useBooking } from "@/providers/BookingProvider";
import { useSearchParams } from "next/navigation";

interface MainPageClientProps {
  services: ServiceProp[];
}

const MainPageClient: React.FC<MainPageClientProps> = ({ services }) => {
  // const services = await getServices();
  // const [servicesBooked, setServicesBooked] = useState<ServiceProp[]>([]);

  const params = useSearchParams();

  useEffect(() => {
    // Get the value of PaymentStatus from the URL
    if (params) {
      // Get the value of PaymentStatus from the URL
      const paymentStatus = (params as any).PaymentStatus;

      if (paymentStatus) {
        // Do something with the PaymentStatus value
        console.log("PaymentStatus:", paymentStatus);
      }
    }
  }, [params]);

  // console.log(services);

  const { servicesBooked, setServicesBooked } = useBooking();

  const handleBookingService = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, value: ServiceProp) => {
      e.stopPropagation();

      setServicesBooked((prevServices) => {
        const index = prevServices.findIndex(
          (service) => service.id === value.id
        );

        if (index === -1) {
          // If the item is not in the array, add it with quantity 1
          return [...prevServices, { ...value, quantity: 1 }];
        } else {
          // If the item is already in the array, update the quantity
          const updatedServices = [...prevServices];
          updatedServices[index] = {
            ...updatedServices[index],
            quantity: (updatedServices[index]?.quantity ?? 0) + 1,
          };
          return updatedServices;
        }
      });
      toast.success("Service added to your cart");
    },
    [setServicesBooked]
  );

  //   console.log(servicesBooked);
  //   console.log("servicesBooked length: ", servicesBooked.length);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     localStorage.setItem("serviceCart", JSON.stringify(servicesBooked));
  //   }
  // }, [servicesBooked]);

  // useEffect(() => {
  //   if (servicesBooked && servicesBooked.length === 0) {
  //     console.log("Empty array servicesBooked");
  //   }

  //   if (typeof window !== "undefined") {
  //     localStorage.setItem("updateServiceCart", JSON.stringify(servicesBooked));
  //   }
  // }, [servicesBooked]);

  return (
    <ClientOnly>
      <div
        className="
          z-0
          w-full
          h-auto
      "
      >
        <div className="">
          <Banner />
        </div>
        <Container>
          <div
            className="
                  p-10
                  grid
                  gird-cols-1
                  sm:grid-cols-2
                  md:grid-cols-3
                  lg:grid-cols-4
                  xl:grid-cols-5
                  2xl:grid-cols-6
                  gap-8
                  
                  "
          >
            {services.map((service: ServiceProp) => {
              const isDeleted = service.isDelete;
              return (
                !isDeleted && (
                  <ListingCard
                    key={service.id}
                    serviceId={service.id}
                    categoryId={service.categoryId}
                    data={service}
                    comboBooking
                    actionLabel="Booking"
                    handleBookingService={handleBookingService}
                    serviceDiscount
                  />
                )
              );
            })}
          </div>
        </Container>
      </div>
    </ClientOnly>
  );
};

export default MainPageClient;
