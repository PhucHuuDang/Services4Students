"use client";

import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";

import Image from "next/image";
import { PackageProps } from "@/app/types";
import { useEffect, useState } from "react";
import EmptyState from "../EmptyState";
import { useBooking } from "@/providers/BookingProvider";
import ClientOnly from "../ClientOnly";

interface CartListingProps {
  data: PackageProps | undefined;
}

const CartListing: React.FC<CartListingProps> = ({ data }) => {
  //   const [dataBookingArray, setDataBookingArray] = useState<PackageProps[]>([]);

  const { storeBookingData, setStoreBookingData } = useBooking();
  //   useEffect(() => {
  //     if (!data || data === undefined) {
  //       return;
  //     }
  //     setDataBookingArray((value: any) => [data, ...value]);

  //   }, [data]);

  //   console.log("data: ", data);

  const removeCart = () => {
    console.log(data?.id);

    if (data && data.id) {
      const updateStoreBookingData = storeBookingData.filter((item) => {
        return item.id !== data.id;
      });

      setStoreBookingData(updateStoreBookingData);
    }

    // if (data?.id === storeBookingData) {
    //   console.log("remove");
    // }
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

  if (!data) {
    return (
      <ClientOnly>
        <EmptyState
          title="Your cart is empty"
          subtitle="Let turn back and add some product you want our serve"
          showReset
        />
      </ClientOnly>
    );
  }

  //   return dataBookingArray.map((item) => {
  return (
    <div
      // key={item.id}
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
                hover:shadow-lg"
    >
      <div className="flex items-center gap-2">
        <Image
          src="/images/glamping.webp"
          width={0}
          height={0}
          className="w-16 rounded-md"
          alt=""
        />

        <div className="flex flex-col gap-1">
          <div className="text-lg font-semibold">{data.packageName}</div>
          {/* <div className="text-lg font-semibold">{item.packageName}</div> */}
          {/* <div className="font-light text-gray-600">{data.dayDoInWeek}</div> */}
          {/* <div className="font-light text-gray-600">{data.dayDoInWeek}</div> */}
          {/* <div className="font-light text-gray-600">{item.dayDoInWeek}</div> */}
        </div>
      </div>
      {/* <div>week booking: {item.weekNumberBooking}</div> */}
      {/* <div>week booking: {data.weekNumberBooking}</div> */}
      {/* <div>times do per week: {item.numberOfPerWeekDoPackage}</div> */}
      {/* <div>times do per week: {data.numberOfPerWeekDoPackage}</div> */}
      {/* <div>price: {item.totalPrice}</div> */}
      <div>price: {data.totalPrice}</div>
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
      <div onClick={removeCart} className="mr-1 hover:cursor-pointer p-1">
        <IoMdClose size={25} />
      </div>
    </div>
  );
  //   });
};

export default CartListing;
