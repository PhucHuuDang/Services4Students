import ClientOnly from "../components/ClientOnly";
import getBookingByStuId from "../components/actions/getBookingByStuId";
import getRegions from "../components/actions/getRegions";
import getRoleUser from "../components/actions/getRoleUser";
import ReportWorkClient from "../reportWork/ReportWorkClient";
import AttendanceClient from "./AttendanceClient";

const AttendancePage = async () => {
  // const getInfo = await getRole()
  const getInfo = await getRoleUser();
  const regions = await getRegions();

  const getDataBookingByStuId = await getBookingByStuId(
    getInfo && typeof getInfo !== "string" && "userIdInTableDb" in getInfo
      ? getInfo.userIdInTableDb
      : ""
  );

  // console.log(regions);
  // console.log(getDataBookingByStuId);

  // console.log(getInfo.userIdInTableDb);

  // console.log(getInfo);
  return (
    <div className="">
      <ClientOnly>
        <AttendanceClient
          getInfo={getInfo}
          getDataBookingByStuId={getDataBookingByStuId}
          regions={regions}
        />
        {/* <ReportWorkClient attendance /> */}

        {/* <Ate */}
      </ClientOnly>
    </div>
  );
};

export default AttendancePage;
