"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import getBookingByStuId from "../components/actions/getBookingByStuId";
import { BookingByStuIdProps } from "../types";

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
  const [dataBookingById, setDataBookingById] = useState([]);
  // console.log(getInfo.userIdInTableDb);

  // const stuId = getInfo.userIdInTableDb;

  // const { data: session } = useSession();
  console.log(getDataBookingByStuId);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const callApi = await getBookingByStuId(stuId);

  //     setDataBookingById(callApi);
  //   };

  //   fetchData();
  // }, [stuId]);

  // console.log(dataBookingById);

  //   console.log(session);
  // console.log(getInfo);

  return <div>AttendanceClient Page</div>;
};

export default AttendanceClient;
