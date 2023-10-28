"use client";

import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { MdOutlinePayment } from "react-icons/md";
import { BsFillHouseAddFill } from "react-icons/bs";

import Image from "next/image";
import { PackageProps } from "@/app/types";
import { useEffect, useState } from "react";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import { useBooking } from "@/providers/BookingProvider";
import Heading from "../components/Heading";
import Logo from "../components/navbar/Logo";
import useApartmentModal from "../hooks/useApartmentModal";

interface CartClientProps {
  data?: PackageProps | undefined;
}

const CartClient: React.FC<CartClientProps> = ({ data }) => {
  const { storeBookingData, setStoreBookingData } = useBooking();
  const useApartment = useApartmentModal();

  console.log(storeBookingData);

  const removeCart = (id: string) => {
    // console.log(storeBookingData.map((item) => item.id));

    const updateStoreBookingData = storeBookingData.filter((item) => {
      return item.id !== id;
    });

    setStoreBookingData(updateStoreBookingData);
  };

  //   if (!dataBookingArray || dataBookingArray.length === 0) {
  //     return (
  //       <EmptyState
  //         title="Your cart is empty"
  //         subtitle="Let turn back and add some product you want our serve"
  //       />
  //     );
  //   }

  if (storeBookingData.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="Your cart is empty"
          subtitle="Let turn back and add some product you want our serve"
          showReset
          booking
        />
      </ClientOnly>
    );
  }

  return (
    <>
      <div className="my-8 flex flex-row justify-center items-center gap-4">
        <Logo />
        <Heading
          title="SpaceT Cart"
          subtitle="Hope you guys give us a chance to serve for you!"
        />
        {/* <div className="flex items-center justify-center gap-4">
            <Logo />
            <Heading
              title="SpaceT Cart"
              subtitle="Hope you guys give us a chance to serve for you!"
            />
          </div> */}

        <div
          className="
                    flex
                    flex-col
                    justify-center
                    items-center
                    absolute 
                    right-0
                    mr-36
                    gap-4   
                    "
        >
          {/* relative left-96  */}
          <div className="text-lg text-neutral-700 font-semibold">
            Look likes you have nothing any apartment info
          </div>
          <div
            onClick={useApartment.onOpen}
            className="
                flex
                flex-row
                items-center
                gap-1
                p-2
                px-4
                bg-[#f58470]
                rounded-lg
                hover:bg-[#f34728]
                hover:shadow-lg
                cursor-pointer
                transition
                duration-200

                "
          >
            <BsFillHouseAddFill size={25} /> Register Apartment
          </div>
        </div>
      </div>
      {storeBookingData.map((item) => {
        return (
          <div
            key={item.id}
            className="
                flex
                cursor-pointer
                flex-row
                items-center
                justify-between
                rounded-lg
                bg-gray-200
                p-2
                transition
                duration-200
                hover:scale-105
                hover:bg-gray-300
                hover:shadow-lg
                "
          >
            <div className="flex items-center gap-2 w-[327px]">
              <Image
                src={item.image as any}
                width={0}
                height={0}
                className="w-16 rounded-md object-cover"
                alt=""
              />

              <div className="flex flex-col gap-1">
                {/* <div className="text-lg font-semibold">{data.packageName}</div> */}
                <div className="text-lg font-semibold">{item.packageName}</div>
                {/* <div className="font-light text-gray-600">{data.dayDoInWeek}</div> */}
                <div className="font-light text-gray-600">
                  {item.dayDoInWeek}
                </div>
              </div>
            </div>
            <div>week booking: {item.weekNumberBooking}</div>
            {/* <div>week booking: {data.weekNumberBooking}</div> */}
            <div>times do per week: {item.numberOfPerWeekDoPackage}</div>
            {/* <div>times do per week: {data.numberOfPerWeekDoPackage}</div> */}
            {/* <div>price: {item.totalPrice}</div> */}
            {/* <div>price: {data.totalPrice}</div> */}
            <div>price: {item.totalPrice}</div>
            <div className="flex items-center gap-3">
              <div>
                <AiOutlineMinus />
              </div>
              1
              <div>
                <AiOutlinePlus />
              </div>
            </div>
            <div className="text-red-600">price: 54000</div>
            <div
              onClick={() => removeCart(item.id)}
              className="hover:cursor-pointer p-1"
            >
              <IoMdClose size={25} />
            </div>

            <div className="mr-3">
              <MdOutlinePayment size={25} />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default CartClient;
