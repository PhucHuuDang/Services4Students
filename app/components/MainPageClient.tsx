"use client";

import { toast } from "react-hot-toast";
import { BsCartCheck } from "react-icons/bs";
import Image from "next/image";
import { GoHeartFill } from "react-icons/go";
import { RiEmotionSadLine } from "react-icons/ri";

import { useCallback, useEffect, useState } from "react";
import { ServiceProp } from "../types";
import ClientOnly from "./ClientOnly";
import Container from "./Container";
import ListingCard from "./inputs/ListingCard";
import Banner from "./navbar/Banner";
import { useBooking } from "@/providers/BookingProvider";
import { useSearchParams } from "next/navigation";
import useFormAttendance from "../hooks/useFormAttendance";
import useCreateAttendanceModal from "../hooks/useCreateAttendanceModal";

interface MainPageClientProps {
  services: ServiceProp[];
}

const MainPageClient: React.FC<MainPageClientProps> = ({ services }) => {
  // const services = await getServices();
  // const [servicesBooked, setServicesBooked] = useState<ServiceProp[]>([]);

  const formAttendance = useFormAttendance();
  const createAttendance = useCreateAttendanceModal();

  const params = useSearchParams();
  // console.log(params);

  useEffect(() => {
    if (params) {
      const paymentStatus = params.get("PaymentStatus");

      if (paymentStatus) {
        if (paymentStatus === "00") {
          toast.custom((t) => (
            <div
              className={`${
                t.visible ? "animate-enter" : "animate-leave"
              } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            >
              <div className="flex-1 w-0 p-4 cursor-pointer">
                <div
                  onClick={createAttendance.onOpen}
                  className="flex items-start"
                >
                  <div className="flex-shrink-0 pt-0.5">
                    <Image
                      className="h-10 w-10 rounded-full"
                      src="/images/logo-primary.svg"
                      width={10}
                      height={10}
                      alt="logo-primary"
                    />
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="flex flex-row items-center gap-1 text-md font-bold text-[#4f4fef]">
                      Thanks for your payment!{" "}
                      <GoHeartFill size={30} style={{ color: "red" }} />
                    </p>
                    <p className="mt-1 text-sm font-semibold text-gray-500">
                      Your payment is successful at , you can create own your
                      attendance schedule
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex border-l border-gray-200">
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Close
                </button>
              </div>
            </div>
          ));
        } else if (paymentStatus === "10") {
          toast.custom((t) => (
            <div
              className={`${
                t.visible ? "animate-enter" : "animate-leave"
              } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            >
              <div className="flex-1 w-0 p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-0.5">
                    <Image
                      className="h-10 w-10 rounded-full"
                      src="/images/logo-primary.svg"
                      width={10}
                      height={10}
                      alt="logo-primary"
                    />
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="flex flex-row items-center gap-1 text-sm font-medium text-red-600">
                      Payment failed!{" "}
                      <RiEmotionSadLine
                        size={30}
                        style={{ color: "#ff6347" }}
                      />
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Ohh, your payment is failed, please try again and check
                      your information or contact us for more information
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex border-l border-gray-200">
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Close
                </button>
              </div>
            </div>
          ));
        }
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
