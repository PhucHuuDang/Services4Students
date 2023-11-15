import DetailAttendanceClient from "@/app/attendance/[detailId]/DetailAttendanceClient";
import ClientOnly from "@/app/components/ClientOnly";
import getAttendByDetailId from "@/app/components/actions/get AttendByDetailId";
import getRoleUser from "@/app/components/actions/getRoleUser";
import { JwtPayload } from "jsonwebtoken";

type Params = {
  params: {
    detailId: string;
  };
};

//
const ReportWorkDetailPage = async ({ params: { detailId } }: Params) => {
  const getRole = await getRoleUser();
  const detailBookingDetailId = await getAttendByDetailId(detailId);

  // const isJwtPayload = (value: any): value is JwtPayload => {
  //   return typeof value === "object" && "role" in value;
  // };

  // // Check if getRole is a JwtPayload, then access the 'role' property
  // const role: string = isJwtPayload(getRole) ? getRole.role : "";
  // console.log(role);

  return (
    <ClientOnly>
      <DetailAttendanceClient
        reportWork
        attendanceByBookingDetailId={detailBookingDetailId}
        getRole={getRole}
      />
    </ClientOnly>
  );
};

export default ReportWorkDetailPage;
