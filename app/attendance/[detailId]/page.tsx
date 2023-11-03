import ClientOnly from "@/app/components/ClientOnly";
import DetailAttendanceClient from "./DetailAttendanceClient";
import getAttendByDetailId from "@/app/components/actions/get AttendByDetailId";

type Params = {
  params: {
    detailId: string;
  };
};

const DetailPage = async ({ params: { detailId } }: Params) => {
  console.log(detailId);
  const attendanceByBookingDetailId = await getAttendByDetailId(detailId);

  //   console.log(attendanceByBookingDetailId);

  return (
    <ClientOnly>
      <DetailAttendanceClient
        attendanceByBookingDetailId={attendanceByBookingDetailId}
      />
    </ClientOnly>
  );
};

export default DetailPage;
