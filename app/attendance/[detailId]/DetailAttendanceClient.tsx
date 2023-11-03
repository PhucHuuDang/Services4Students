"use client";

import { AttendanceByDetailId } from "@/app/types";

interface DetailAttendanceClientProps {
  attendanceByBookingDetailId: AttendanceByDetailId;
}

const DetailAttendanceClient: React.FC<DetailAttendanceClientProps> = ({
  attendanceByBookingDetailId,
}) => {
  return (
    <div className="flex flex-row sm:gap-[3rem] md:gap-[2rem] lg:gap-[4rem] 2xl:gap-[14rem]  h-auto">
      <div className="flex flex-col items-center gap-4">
        <div className="text-lg font-semibold">Attendance Created</div>
        {attendanceByBookingDetailId.attendReports.map((item) => {
          const createdDate = item.created.split("T")[0];
          return (
            <div key={item.id} className="p-2 mt-1 rounded-md">
              {createdDate}
            </div>
          );
        })}
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="text-lg font-semibold">Date do package(combo)</div>
        {attendanceByBookingDetailId.attendReports.map((item) => {
          const dateDoPackage = item.dateDoPackage.split("T")[0];
          return (
            <div key={item.id} className=" p-2 rounded-md">
              {dateDoPackage}
            </div>
          );
        })}
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="text-lg font-semibold">Attendance Status</div>
        {attendanceByBookingDetailId.attendReports.map((item) => {
          // const dateDoPackage = item.dateDoPackage.split("T")[0];

          return (
            <div key={item.id} className=" p-2 rounded-md">
              {item.attendenceStatus === 0 ? "Not yet" : "Finished"}
            </div>
          );
        })}
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="text-lg font-semibold">Feedback</div>
        {attendanceByBookingDetailId.attendReports.map((item) => {
          // const dateDoPackage = item.dateDoPackage.split("T")[0];

          return (
            <div key={item.id} className=" p-2 rounded-md">
              {/* {item.feedbackAvailable} */}
              Feedback
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DetailAttendanceClient;
