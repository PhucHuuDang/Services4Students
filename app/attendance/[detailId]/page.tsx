import ClientOnly from "@/app/components/ClientOnly";
import DetailAttendanceClient from "./DetailAttendanceClient";
import getAttendByDetailId from "@/app/components/actions/get AttendByDetailId";
import getReviewFeedback from "@/app/components/actions/getReviewFeeback";

type Params = {
  params: {
    detailId: string;
  };
};

const DetailPage = async ({ params: { detailId } }: Params) => {
  // console.log(detailId);
  const attendanceByBookingDetailId = await getAttendByDetailId(detailId);

  const reviewFeedback = await getReviewFeedback(
    attendanceByBookingDetailId.bookingDetail.id
  );

  //   console.log(attendanceByBookingDetailId);

  return (
    <ClientOnly>
      <DetailAttendanceClient
        attendanceByBookingDetailId={attendanceByBookingDetailId}
        reviewFeedback={reviewFeedback}
      />
    </ClientOnly>
  );
};

export default DetailPage;
