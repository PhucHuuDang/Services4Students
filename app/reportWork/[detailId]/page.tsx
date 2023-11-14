import DetailAttendanceClient from "@/app/attendance/[detailId]/DetailAttendanceClient";
import ClientOnly from "@/app/components/ClientOnly";
import getAttendByDetailId from "@/app/components/actions/get AttendByDetailId";
import { useRouter } from "next/router";

type Params = {
  params: {
    detailId: string;
  };
};

//
const ReportWorkDetailPage = async ({ params: { detailId } }: Params) => {
  //   console.log(detailId);

  //   const exampleString = router.query.example;
  const detailBookingDetailId = await getAttendByDetailId(detailId);

  //   console.log(detailBookingDetailId);

  return (
    <ClientOnly>
      <DetailAttendanceClient
        reportWork
        attendanceByBookingDetailId={detailBookingDetailId}
      />
    </ClientOnly>
  );
};

export default ReportWorkDetailPage;
