"use client";

import FeedbackModal from "@/app/components/modals/FeedbackModal";
import useFeedbackModal from "@/app/hooks/useFeedbackModal";
import {
  AttendanceByDetailId,
  AttendanceReport,
  AttendanceTableProps,
  ReportWorkTableProps,
  ReviewFeedbackProps,
} from "@/app/types";
import { useEffect, useState } from "react";
import { FcFeedback } from "react-icons/fc";
import { AiOutlineFileDone } from "react-icons/ai";
import ReportWorkModal from "@/app/components/modals/ReportWorkModal";
import useReportWorkModal from "@/app/hooks/useReportWorkModal";
import ReviewFeedbackModal from "@/app/components/modals/ReviewFeedback";
import useReviewFeedbackModal from "@/app/hooks/useReviewFeedbackModal";
import getReviewFeedback from "@/app/components/actions/getReviewFeeback";
interface DetailAttendanceClientProps {
  attendanceByBookingDetailId: AttendanceTableProps[] | [];
  reportWorkByBookingDetailId?: ReportWorkTableProps[] | [];
  reportWork?: boolean;
  getRole?: any;
  reviewFeedback?: ReviewFeedbackProps[];
}

const DetailAttendanceClient: React.FC<DetailAttendanceClientProps> = ({
  attendanceByBookingDetailId,
  reportWorkByBookingDetailId,
  reportWork,
  getRole,
  reviewFeedback,
}) => {
  const feedbackModal = useFeedbackModal();
  const reportWorkModal = useReportWorkModal();
  const reviewFeedbackModal = useReviewFeedbackModal();

  const [feedbackId, setFeedbackID] = useState("");
  const [attendReportId, setAttendReportId] = useState("");

  const [disabledReportId, setDisabledReportId] = useState("");

  // const id = attendanceByBookingDetailId.bookingDetail.id;

  // console.log(reviewFeedback);

  // console.log(id);

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
  // console.log(attendanceByBookingDetailId);

  return (
    <>
      <div className="relative">
        <div
          onClick={reviewFeedbackModal.onOpen}
          className="
                absolute
                w-[200px]
                text-center
                right-0
                top-[-100px]
                p-3
                px-6
                rounded-lg
                cursor-pointer
                border-[1px]
                bg-[#ee6a53]
                hover:bg-[#f03d1d]
                hover:scale-105
                hover:bg-neutral

                duration-200
                "
        >
          Review Feedback
        </div>
      </div>
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
        {!reportWork ? (
          <>
            <div className="flex flex-col items-center gap-3">
              <div className="text-lg font-semibold">Date Working</div>
              {attendanceByBookingDetailId.map((item) => {
                const createdDate = item.dateDoService.split("T")[0];
                // const createdTime = item.dateDoService.split("T")[1];
                const createdTime = item.dateDoService
                  .split("T")[1]
                  .split(":")
                  .slice(0, 2)
                  .join(":");
                return (
                  <div key={item.serviceId} className="p-2 mt-1 rounded-md">
                    {`In ${createdDate} at ${createdTime}`}
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="text-lg font-semibold">Address</div>
              {attendanceByBookingDetailId.map((item) => {
                // const dateDoPackage = item.dateDoPackage.split("T")[0];
                return (
                  <div key={item.serviceId} className=" p-2 rounded-md">
                    {item.apartmentRegion}
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="text-lg font-semibold">Attendance Status</div>
              {attendanceByBookingDetailId.map((item) => {
                // console.log(item);
                // const dateDoPackage = item.dateDoPackage.split("T")[0];
                return (
                  <div key={item.serviceId} className=" p-2 rounded-md">
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
              {attendanceByBookingDetailId.map((item) => {
                // const dateDoPackage = item.dateDoPackage.split("T")[0];

                // console.log(item.feedBack.id);

                // console.log(item.feedBack.feedBackStatus);
                // console.log(!item.feedBack.feedBackDescription);

                // console.log(item.feedbackStatus);

                return (
                  <div
                    onClick={() => {
                      // feedbackModal.onOpen();
                      // setFeedbackID(item.feedBack.id);

                      // if (item.feedBack.feedBackStatus === 0) {
                      //   feedbackModal.onOpen();
                      //   setFeedbackID(item.feedBack.id);
                      // }
                      if (item.feedbackStatus === "1") {
                        feedbackModal.onOpen();
                        setFeedbackID(item.feedBackId);
                      }
                    }}
                    key={item.serviceId}
                    className={`
              p-2
              rounded-md
              flex
              flex-row
              items-center
              gap-2
              bg-neutral-100
              duration-200
             
              ${
                item.feedbackStatus !== "1"
                  ? "disabled opacity-40 cursor-not-allowed text-neutral-700"
                  : "hover:bg-neutral-200 hover:scale-105 hover:shadow-lg cursor-pointer"
              }
        
              `}
                  >
                    {/* {item.feedbackAvailable} */}
                    <FcFeedback size={24} />
                    Feedback
                  </div>
                  //   ) : (
                  //     <div
                  //       onClick={() => {
                  //         if (item.attendenceStatus === 0) {
                  //           reportWorkModal.onOpen();
                  //           setAttendReportId(item.serviceId);
                  //         }

                  //         // reportWorkModal.onOpen();
                  //         // setAttendReportId(item.id);
                  //       }}
                  //       key={item.serviceId}
                  //       className={`
                  //     p-2
                  //     rounded-md
                  //     flex
                  //     flex-row
                  //     items-center
                  //     gap-2
                  //     bg-neutral-100
                  //     duration-200
                  // ${
                  //   item.attendenceStatus !== 0
                  //     ? "disabled opacity-40 cursor-not-allowed text-neutral-700"
                  //     : "hover:bg-neutral-200 hover:scale-105 hover:shadow-lg cursor-pointer"
                  // }

                  // `}
                  //     >
                  //       {/* {item.feedbackAvailable} */}
                  //       <AiOutlineFileDone size={24} />
                  //       Report Work
                  //     </div>
                  //   );
                );
              })}
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center gap-3">
              <div className="text-lg font-semibold">Date Working</div>
              {reportWorkByBookingDetailId &&
                reportWorkByBookingDetailId.map((item) => {
                  const createdDate = item.workingDayExpect.split("T")[0];
                  // const createdTime = item.dateDoService.split("T")[1];
                  const createdTime = item.workingDayExpect
                    .split("T")[1]
                    .split(":")
                    .slice(0, 2)
                    .join(":");
                  return (
                    <div
                      key={item.attendReportId}
                      className="p-2 mt-1 rounded-md"
                    >
                      {`In ${createdDate} at ${createdTime}`}
                    </div>
                  );
                })}
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="text-lg font-semibold">Address</div>
              {reportWorkByBookingDetailId &&
                reportWorkByBookingDetailId.map((item) => {
                  // const dateDoPackage = item.dateDoPackage.split("T")[0];
                  return (
                    <div key={item.attendReportId} className=" p-2 rounded-md">
                      {item.workingAt}
                    </div>
                  );
                })}
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="text-lg font-semibold">Report Status</div>
              {reportWorkByBookingDetailId &&
                reportWorkByBookingDetailId.map((item) => {
                  // console.log(item);
                  // const dateDoPackage = item.dateDoPackage.split("T")[0];
                  return (
                    <div key={item.attendReportId} className=" p-2 rounded-md">
                      {item.workingStatus === 0 ? (
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
              <div className="text-lg font-semibold">Report</div>
              {/* {attendanceByBookingDetailId.attendReports.map((item) => { */}
              {reportWorkByBookingDetailId &&
                reportWorkByBookingDetailId.map((item) => {
                  // const dateDoPackage = item.dateDoPackage.split("T")[0];

                  // console.log(item.feedBack.id);

                  // console.log(item.feedBack.feedBackStatus);
                  // console.log(!item.feedBack.feedBackDescription);

                  return (
                    <div
                      onClick={() => {
                        if (item.workingStatus === 0) {
                          reportWorkModal.onOpen();
                          setAttendReportId(item.attendReportId);
                        }

                        // reportWorkModal.onOpen();
                        // setAttendReportId(item.id);
                      }}
                      key={item.attendReportId}
                      className={`
                  p-2
                  rounded-md
                  flex
                  flex-row
                  items-center
                  gap-2
                  bg-neutral-100
                  duration-200
              ${
                item.workingStatus !== 0
                  ? "disabled opacity-40 cursor-not-allowed text-neutral-700"
                  : "hover:bg-neutral-200 hover:scale-105 hover:shadow-lg cursor-pointer"
              }
              
              
        
              `}
                    >
                      {/* {item.feedbackAvailable} */}
                      <AiOutlineFileDone size={24} />
                      {item.workingStatus !== 0 ? "Reported" : "Report Work "}
                    </div>
                  );
                })}
            </div>
          </>
        )}

        <FeedbackModal feedbackId={feedbackId} setFeedbackID={setFeedbackID} />
        <ReportWorkModal
          attendReportId={attendReportId}
          setDisabledReportId={setDisabledReportId}
        />

        <ReviewFeedbackModal
          reviewFeedback={reviewFeedback}
          isOpen={reviewFeedbackModal.isOpen}
          onClose={reviewFeedbackModal.onClose}
          onConfirmDelete={() => {}}
        />
      </div>
    </>
  );
};

export default DetailAttendanceClient;
