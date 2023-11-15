"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import getBookingByStuId from "../components/actions/getBookingByStuId";
import { BookingByStuIdProps } from "../types";
import { GrSchedules } from "react-icons/gr";

type RegionsType = {
  id: string;
  regionName: string;
};

interface AttendanceClientProps {
  getInfo: any | null;
  getDataBookingByStuId: BookingByStuIdProps | null;
  regions: RegionsType;
}

const AttendanceClient: React.FC<AttendanceClientProps> = ({
  getInfo,
  getDataBookingByStuId,
  regions,
}) => {
  return (
    <div
      className="
      relative
      flex
      justify-center
      items-center
      md:left-[10%]   
      md:top-[10%]    
      lg:left-[73%]   
      lg:top-[20%]    
      2xl:left-[480px]
      
          "
    >
      <div className="flex flex-col items-center gap-1 animate-bounce duration-700">
        <GrSchedules size={50} />
        <span className="text-md font-semibold">
          Choose your apartment to track schedule work
        </span>
      </div>
    </div>
  );
};

export default AttendanceClient;
