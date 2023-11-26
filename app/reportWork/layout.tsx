import { useCallback, useMemo } from "react";
import ApartmentDetail from "../attendance/components/ApartmentDetail";
import ClientOnly from "../components/ClientOnly";
import Heading from "../components/Heading";
import getBookingDetailByStaffId from "../components/actions/getBookingDetailByStaffId";
import getRoleUser from "../components/actions/getRoleUser";
import ReportWorkClient from "./ReportWorkClient";
import getBookingsByBookingId from "../components/actions/getBookingsByBookingId";
import { BookingByStuIdProps, BookingsProps } from "../types";
import getRegions from "../components/actions/getRegions";
import getPackages from "../components/actions/getPackages";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  // let arrayData: BookingByStuIdProps[] = [];

  const getInfo = await getRoleUser();
  const regions = await getRegions();
  const packages = await getPackages();
  const staffId =
    getInfo && typeof getInfo !== "string" && "userIdInTableDb" in getInfo
      ? getInfo.userIdInTableDb
      : "";
  const serviceBookingDetailStaffId = await getBookingDetailByStaffId(staffId);

  // try {
  //   const bookingDetailByStaffId = await getBookingDetailByStaffId(
  //     getInfo && typeof getInfo !== "string" && "userIdInTableDb" in getInfo
  //       ? getInfo.userIdInTableDb
  //       : ""
  //   );

  //   // console.log(bookingDetailByStaffId);

  //   if (bookingDetailByStaffId) {
  //     for (const item of bookingDetailByStaffId) {
  //       try {
  //         const dataBookings = await getBookingsByBookingId(
  //           item.bookingDetailData.bookingId
  //         );
  //         //   console.log(dataBookings);
  //         arrayData.push(dataBookings);
  //       } catch (error) {
  //         console.error("Error fetching bookings:", error);
  //       }
  //     }
  //   }

  //   // console.log(arrayData);
  // } catch (error) {
  //   console.error("Error fetching data:", error);
  // }

  return (
    <ClientOnly>
      <div className="pt-32 mb-6">
        <Heading
          title="Report work"
          subtitle="You can tracking staff's reservation for your house beside that let me know your feedback daily"
          center
        />
      </div>

      <hr />

      <div className="pl-10 pt-20">
        <div className="text-2xl font-semibold text-neutral-700 sm:w-[25%] md:w-[20%] lg:w-[27%] xl:w-[20%]">
          The apartment you was assign to work
        </div>
      </div>
      <div className="flex flex-row gap-10 sm:gap-[3rem] md:gap-[2rem] xl:gap-24 2xl:gap-[8rem]">
        <div
          className="flex flex-col 
            sm:w-[45%]
            md:w-[40%]
            lg:w-[50%]
            xl:w-[30%]
            2xl:w-[20%]
            
            "
        >
          <ApartmentDetail
            reportWork
            getDataBookingByStuId={serviceBookingDetailStaffId}
            // getdataBookingDetailByStaffId={serviceBookingDetailStaffId}
            getInfo={getInfo}
            regions={regions}
            packages={packages}
          />
        </div>

        <div>{children}</div>
      </div>
    </ClientOnly>
  );
}
