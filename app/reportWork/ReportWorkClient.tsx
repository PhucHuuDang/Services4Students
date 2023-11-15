"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AiOutlineSchedule } from "react-icons/ai";
import { GrSchedules } from "react-icons/gr";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";

interface ReportWorkClientProps {
  attendance?: boolean;
  getRole: any | null;
}

const ReportWorkClient: React.FC<ReportWorkClientProps> = ({
  attendance,
  getRole,
}) => {
  const router = useRouter();

  useEffect(() => {
    if (getRole && getRole.role !== "Staff") {
      router.push("/");
      // console.log(getRole);
    }
  }, [router, getRole]);

  if (getRole && getRole.role !== "Staff") {
    // console.log("first");
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
        <AiOutlineSchedule size={50} />
        <span className="text-md font-semibold">
          Choose your schedule to report work
        </span>
      </div>
    </div>
  );
};

export default ReportWorkClient;
