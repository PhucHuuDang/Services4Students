"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import useVerifyToken from "../hooks/useVerifyToken";
import Heading from "../components/Heading";
import StaffInfoListing from "../components/listings/StaffInfoListing";

interface ManageStaffClientProps {
  staffsInfo: any;
}

const ManageStaffClient: React.FC<ManageStaffClientProps> = ({
  staffsInfo,
}) => {
  const useResultVerifyToken: any = useVerifyToken();
  const router = useRouter();

  useEffect(() => {
    if (useResultVerifyToken && useResultVerifyToken.role !== "Admin") {
      router.push("/");
      console.log(useResultVerifyToken);
    }
  }, [router, useResultVerifyToken]);

  if (useResultVerifyToken && useResultVerifyToken.role !== "Admin") {
    console.log("first");
    return (
      <ClientOnly>
        <EmptyState
          title="You are not authorized to access"
          subtitle="Redirect to your page"
        />
      </ClientOnly>
    );
  }

  return (
    <>
      <div className="pt-20">
        <Heading title="Manage Staffs" center />
      </div>
      <div
        className="
              flex
              flex-row
              items-center
              gap-3
              md:gap-1
              p-10
              w-full
              h-auto
          "
      >
        <div
          className="
              flex
              flex-col
              flex-1
              mt-5 
  
          "
        >
          {staffsInfo.map((item: any) => {
            return (
              <StaffInfoListing
                key={item.inforOfStaffData.id}
                id={item.inforOfStaffData.id}
                fullName={item.inforOfStaffData.fullName}
                email={item.inforOfStaffData.email}
                date={item.staffData.created}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ManageStaffClient;
