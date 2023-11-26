import DetailAttendanceClient from "@/app/attendance/[detailId]/DetailAttendanceClient";
import ClientOnly from "@/app/components/ClientOnly";
import getAttendByDetailId from "@/app/components/actions/getAttendByDetailId";
import getReportByStaffId from "@/app/components/actions/getReportByStaffId";
import getReviewFeedback from "@/app/components/actions/getReviewFeeback";
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

  // const reviewFeedback = await getReviewFeedback(
  //   detailBookingDetailId.bookingDetail.id
  // );

  const studentId =
    getRole && typeof getRole !== "string" && "userIdInTableDb" in getRole
      ? getRole.userIdInTableDb
      : "";

  const reportByStaffId = await getReportByStaffId(studentId, detailId);

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
        attendanceByBookingDetailId={[]}
        reportWorkByBookingDetailId={reportByStaffId}
        getRole={getRole}
        // reviewFeedback={reviewFeedback}
      />
    </ClientOnly>
  );
};

export default ReportWorkDetailPage;
