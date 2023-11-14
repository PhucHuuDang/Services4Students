"use client";

import FeedbackModal from "@/app/components/modals/FeedbackModal";
import useFeedbackModal from "@/app/hooks/useFeedbackModal";
import { AttendanceByDetailId, AttendanceReport } from "@/app/types";
import { useState } from "react";
import { FcFeedback } from "react-icons/fc";
import { AiOutlineFileDone } from "react-icons/ai";
interface DetailAttendanceClientProps {
  attendanceByBookingDetailId: AttendanceByDetailId;
  reportWork?: boolean;
}

const DetailAttendanceClient: React.FC<DetailAttendanceClientProps> = ({
  attendanceByBookingDetailId,
  reportWork,
}) => {
  const feedbackModal = useFeedbackModal();

  const [feedbackId, setFeedbackID] = useState("");
  const [reportWorkId, setReportWorkId] = useState("");

  // console.log(attendanceByBookingDetailId);
  // const test = attendanceByBookingDetailId.bookingDetail.attendReport.map(
  //   (item) => {
  //     return console.log(item.feedBack.id);
  //   }
  // );

  // const handleGetFeedbackId = () => {
  //   const test = attendanceByBookingDetailId.bookingDetail.attendReport.map(
  //     (item) => {
  //       return attendanceByBookingDetailId.attendReports.map((attendId) => {
  //         return item.id === attendId.id ? item.feedBack.id : "";
  //       });
  //     }
  //   );

  //   console.log(test);
  // };

  // console.log("feedbackId: ", feedbackId);

  return (
    <div
      className="
          flex
          flex-row
          sm:gap-[3rem]
          md:gap-[2rem]
          lg:gap-[4rem]
          2xl:gap-[14rem]
          h-auto
          
          "
    >
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
              {item.attendenceStatus === 0 ? (
                <span className="text-red-500 font-semibold text-md">
                  Not yet
                </span>
              ) : (
                <span className="text-green-700 font-semibold text-md">
                  Finished
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="text-lg font-semibold">Feedback</div>
        {/* {attendanceByBookingDetailId.attendReports.map((item) => { */}
        {attendanceByBookingDetailId.bookingDetail.attendReport.map((item) => {
          // const dateDoPackage = item.dateDoPackage.split("T")[0];

          // console.log(item);

          return !reportWork ? (
            <div
              onClick={() => {
                feedbackModal.onOpen();
                setFeedbackID(item.feedBack.id);
                // handleGetFeedbackId();
              }}
              key={item.id}
              className="
                  p-2
                  rounded-md
                  flex
                  flex-row
                  items-center
                  gap-2
                  bg-neutral-100
                  hover:bg-neutral-200
                  hover:scale-105
                  hover:shadow-lg
                  duration-200
                  cursor-pointer
                  "
            >
              {/* {item.feedbackAvailable} */}
              <FcFeedback size={24} />
              Feedback
            </div>
          ) : (
            <div
              onClick={() => {
                feedbackModal.onOpen();
                setReportWorkId(item.id);
                // handleGetFeedbackId();
              }}
              key={item.id}
              className="
                  p-2
                  rounded-md
                  flex
                  flex-row
                  items-center
                  gap-2
                  bg-neutral-100
                  hover:bg-neutral-200
                  hover:scale-105
                  hover:shadow-lg
                  duration-200
                  cursor-pointer
                  "
            >
              {/* {item.feedbackAvailable} */}
              <AiOutlineFileDone size={24} />
              Report Work
            </div>
          );
        })}
      </div>

      <FeedbackModal feedbackId={feedbackId} setFeedbackID={setFeedbackID} />
    </div>
  );
};

export default DetailAttendanceClient;
