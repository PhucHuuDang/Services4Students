import AttendanceClient from "./AttendanceClient";
import ClientOnly from "../components/ClientOnly";
import ApartmentDetail from "./components/ApartmentDetail";
import Heading from "../components/Heading";
import getRoleUser from "../components/actions/getRoleUser";
import getRegions from "../components/actions/getRegions";
import getBookingByStuId from "../components/actions/getBookingByStuId";
import getPackages from "../components/actions/getPackages";
import EmptyState from "../components/EmptyState";
import getServiceOfBookingDataDetail from "../components/actions/getServiceBookingDataDetail";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const getInfo = await getRoleUser();
  const regions = await getRegions();
  const packages = await getPackages();

  const getDataBookingByStuId = await getServiceOfBookingDataDetail(
    getInfo && typeof getInfo !== "string" && "userIdInTableDb" in getInfo
      ? getInfo.userIdInTableDb
      : ""
  );

  // console.log(getDataBookingByStuId);

  // console.log(getDataBookingByStuId);

  // if (!getDataBookingByStuId) {
  //   return (
  //     <ClientOnly>
  //       <EmptyState
  //         title="Look likes you don't have any package services"
  //         subtitle="Let booking some packages to us can have a chance to serve your're housing"
  //         showReset
  //         booking
  //       />
  //     </ClientOnly>
  //   );
  // }

  return (
    <ClientOnly>
      <div className="pt-32 mb-6">
        <Heading
          title="Attendance report"
          subtitle="You can tracking staff's reservation for your house beside that let me know your feedback daily"
          center
        />
      </div>

      <hr />

      <div className="pl-10 pt-20">
        <div className="text-2xl font-semibold text-neutral-700 sm:w-[25%] md:w-[20%] lg:w-[27%] xl:w-[20%]">
          Services you have booked!
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
            getDataBookingByStuId={getDataBookingByStuId}
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
