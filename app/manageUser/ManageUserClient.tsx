"use client";

import { useRouter } from "next/navigation";

import Heading from "../components/Heading";
import UserInfoListing from "../components/listings/UserInfoListing";
import useVerifyToken from "../hooks/useVerifyToken";
import { useEffect } from "react";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";

interface ManageUserClientProps {
  studentsInfo: any;
}

const ManageUserClient: React.FC<ManageUserClientProps> = ({
  studentsInfo,
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
        <Heading title="Manage Users" center />
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
          {/* 
             grid
            lg:grid-cols-2
            md:grid-cols-1
            gap-4
            
            */}

          {studentsInfo.map((item: any) => {
            return (
              <UserInfoListing
                key={item.applicationUserTableData.id}
                id={item.applicationUserTableData.id}
                fullName={item.applicationUserTableData.fullName}
                email={item.applicationUserTableData.email}
                date={item.studentTableData.created}
              />
            );
          })}

          {/* <div
            onClick={() => {}}
            className="
                    bg-gray-50
                    p-4
                    rounded-lg
                    cursor-pointer
                    hover:bg-gray-100
                    transition
                    duration-200
                    border-b-[1px]

                    "
          >
            <div className="flex fle-row items-center justify-between gap-5">
              <div className="flex flex-row items-center gap-5">
                <Image
                  src="/images/avatarPlaceHolder.jpg"
                  alt="User"
                  width="50"
                  height="50"
                  className="rounded-full"
                />
                <div className="flex flex-col gap-1">
                  <div className="text-lg font-semibold">
                    the fullName for staff
                  </div>
                  <div>the gmail for staff</div>
                </div>
              </div>

              <div
                className="
                    flex 
                    flex-col 
                    p-3 
                    cursor-pointer 
                    rounded-lg
                    hover:bg-gray-200
                    hover:shadow-md
                    transition
                    duration-150
                    "
              >
                <MdOutlineDeleteSweep size={30} />
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default ManageUserClient;
