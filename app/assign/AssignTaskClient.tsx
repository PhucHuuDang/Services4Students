"use client";

import Button from "../components/Button";
import Heading from "../components/Heading";
import { DetailsProps } from "../types";

interface AssignTaskClientProps {
  dataBookingDetail: DetailsProps;
}

const AssignTaskClient: React.FC<AssignTaskClientProps> = ({
  dataBookingDetail,
}) => {
  return (
    <div
      className="
        col-span-1
        gap-5
        group
        "
    >
      <div
        className="
            flex
            flex-col
            gap-3
            w-full
            p-4
            rounded-xl
            cursor-pointer
            border-[1px]
            hover:scale-105
            hover:shadow-lg
            duration-200

        "
      >
        <div
          className="
            bg-red-599
            text-center
            min-h-[130px]
            flex-wrap
            pr-4
            text-xl
            font-semibold"
        >
          {dataBookingDetail.bookingDetailName}
        </div>
        <div>
          Working term:{" "}
          <span className="font-bold text-green-500">
            {dataBookingDetail.remainingTaskDuration}
          </span>
        </div>
        <div>
          Quantity package:{" "}
          <span className="font-bold text-green-500">
            {dataBookingDetail.quantityOfPackageOrdered}
          </span>
        </div>
        <div>
          Total price quantity:{" "}
          <span className="font-bold text-green-500">
            {dataBookingDetail.totalPriceQtity}$
          </span>
        </div>

        {/* <div className="flex items-center">
          <div className="w-[100px] text-center">
            <Button label="Assign" onClick={() => {}} />
          </div>
        </div> */}
        <Button label="Assign" onClick={() => {}} />
      </div>
    </div>
  );
};

export default AssignTaskClient;
