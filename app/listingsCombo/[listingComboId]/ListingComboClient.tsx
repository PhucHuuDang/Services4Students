"use client";

import Container from "@/app/components/Container";
import CartListing from "@/app/components/listings/CartListing";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingServiceName from "@/app/components/listings/ListingServiceName";
import { PackageProps, getServicesInAPackage } from "@/app/types";
import { useBooking } from "@/providers/BookingProvider";
import { useState } from "react";
import { toast } from "react-hot-toast";

import { BsCartCheck } from "react-icons/bs";

import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
import useStoreBooking from "@/app/hooks/useStoreBooking";

interface ListingsComboClientProps {
  data: getServicesInAPackage;
}

const ListingComboClient: React.FC<ListingsComboClientProps> = ({ data }) => {
  // const [dataBooking, setDataBooking] = useState<PackageProps[]>([]);
  const [dataBooking, setDataBooking] = useState<PackageProps[]>([]);
  const { storeBookingData, setStoreBookingData } = useBooking();

  const useStoreBookingShow = useStoreBooking();

  const numberOfServices = data.listServiceData.length;

  // const handleBooking = () => {
  //   // if (dataBooking.includes(data.packageData)) {
  //   //   dataBooking.filter((item) => {
  //   //     const removed =
  //   //       item.id === data.packageData.id
  //   //         ? { ...dataBooking, ...data.packageData }
  //   //         : { dataBooking };

  //   //     setDataBooking([...removed]);
  //   //   });
  //   // } else {
  //   // }
  //   // setDataBooking((value) => [data.packageData, ...value]);
  //   // if (!dataBooking.some((item) => item.id === data.packageData.id)) {
  //   if (dataBooking?.id !== data.packageData.id) {
  //     setDataBooking(data.packageData);
  //   }

  //   // }
  //   // setDataBooking([...dataBooking, data.packageData]);
  // };

  const handleBooking = (item: PackageProps) => {
    // if (storeBookingData.some((cartItem) => (cartItem.id = item.id))) {
    //   toast("This item already exist in your cart", {
    //     icon: <BsCartCheck size={18} />,
    //   });
    // }

    if (!storeBookingData.some((cartItem) => cartItem.id === item.id)) {
      // setDataBooking([item, ...dataBooking]);
      setStoreBookingData([item, ...storeBookingData]);
      toast.success("Booking successful!");
    } else {
      toast("This item already exist in your cart", {
        icon: <BsCartCheck size={22} />,
      });
    }

    // if (dataBooking.length === 0) {
    //   // setDataBooking([data.packageData]);
    //   return;
    // }
  };

  // if (!dataBooking || dataBooking === undefined) {
  //   return;
  // }

  // console.log(dataBooking);

  // console.log("storeBookingData: ", storeBookingData);

  // console.log(storeBookingData.length === 0);

  // if (storeBookingData.length === 0) {
  //   return (
  //     <ClientOnly>
  //       <EmptyState
  //         title="Your cart is empty"
  //         subtitle="Let turn back and add some product you want our serve"
  //         showReset
  //         booking
  //       />
  //     </ClientOnly>
  //   );
  // }

  // if (storeBookingData.length === 0) {
  //   return (
  //     <ClientOnly>
  //       <EmptyState
  //         title="Your cart is empty"
  //         subtitle="Let turn back and add some product you want our serve"
  //         showReset
  //         booking
  //       />
  //     </ClientOnly>
  //   );
  // }

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto pt-24">
        <div className="flex flex-col gap-6">
          {/* {useStoreBookingShow.isOpen ? (
            // <CartListing data={dataBooking} />
            storeBookingData.map((data: any) => {
              return storeBookingData.length === 0 ? (
                <div>
                  <ClientOnly>
                    <EmptyState
                      title="Your cart is empty"
                      subtitle="Let turn back and add some product you want our serve"
                      showReset
                      booking
                    />
                  </ClientOnly>
                </div>
              ) : (
                <div>
                  <CartListing key={data.id} data={data} />
                </div>
              );
              // <CartListing key={data.id} data={data} />
            })
          ) : (
            <> */}
          <ListingHead
            title={data.packageData.packageName}
            // imageSrc={data.packageData.image}
            // imageSrc="/images/glamping.webp"
            imageSrc={data.packageData.image}
            id={data.packageData.id}
          />

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              md:gap-12
              mt-6
          "
          >
            <div className="text-lg font-light">
              {data.packageData.packageDescription}
            </div>

            <div
              className={`
                flex
                flex-row
                sm:justify-center
                ${
                  data.listServiceData.length === 2
                    ? "md:justify-start"
                    : "md:justify-between"
                }
                flex-wrap
                order-first
                gap-3
                mb-10
                md:order-last
                
            `}
            >
              {data.listServiceData.map((item) => {
                return (
                  <ListingServiceName
                    key={item.id}
                    serviceName={item.serviceName}
                    serviceId={item.id}
                  />
                );
              })}
            </div>
          </div>
          <div
            className="
            flex
            flex-row
            items-center
            justify-center
            ml-8
          "
          >
            <div
              // onClick={(e) => console.log(data.packageData)}
              onClick={() => handleBooking(data.packageData)}
              className="
                    
                    p-2
                    px-8
                    ml-36
                    rounded-md
                    cursor-pointer
                    bg-[#e87561]
                    hover:bg-[#ed6047]
                    shadow-md
                    transition

              "
            >
              Booking
            </div>
          </div>
          {/* </>
          )} */}
        </div>
      </div>

      {/* <button onClick={useStoreBookingShow.onClose}>Click</button> */}
    </Container>
  );
};

export default ListingComboClient;
