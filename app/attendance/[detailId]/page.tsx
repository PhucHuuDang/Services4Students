import ClientOnly from "@/app/components/ClientOnly";
import DetailAttendanceClient from "./DetailAttendanceClient";
import getAttendByDetailId from "@/app/components/actions/getAttendByDetailId";
import getReviewFeedback from "@/app/components/actions/getReviewFeeback";
import getRoleUser from "@/app/components/actions/getRoleUser";
import getAttendByStudentId from "@/app/components/actions/getAttendByStudentId";

type Params = {
  params: {
    detailId: string;
  };
};

const DetailPage = async ({ params: { detailId } }: Params) => {
  // console.log(detailId);
  const getInfo = await getRoleUser();

  const attendanceByBookingDetailId = await getAttendByDetailId(detailId);

  const studentId =
    getInfo && typeof getInfo !== "string" && "userIdInTableDb" in getInfo
      ? getInfo.userIdInTableDb
      : "";

  const attendanceByStudentId = await getAttendByStudentId(studentId, detailId);

  // console.log(attendanceByStudentId);3

  // const reviewFeedback = await getReviewFeedback(
  //   attendanceByBookingDetailId.bookingDetail.id
  // );

  //   console.log(attendanceByBookingDetailId);

  return (
    <ClientOnly>
      <DetailAttendanceClient
        attendanceByBookingDetailId={attendanceByStudentId}
        // reviewFeedback={reviewFeedback}
      />
    </ClientOnly>
  );
};

export default DetailPage;
