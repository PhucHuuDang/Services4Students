"use client";

import { BsPeople } from "react-icons/bs";

import { useRouter } from "next/navigation";

import Heading from "../components/Heading";
import UserInfoListing from "../components/listings/UserInfoListing";
import useVerifyToken from "../hooks/useVerifyToken";
import { useEffect } from "react";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import { useDebouncedState } from "@mantine/hooks";

interface ManageUserClientProps {
  studentsInfo: any;
}

const ManageUserClient: React.FC<ManageUserClientProps> = ({
  studentsInfo,
}) => {
  const [search, setSearch] = useDebouncedState("", 200, { leading: true });
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
      <div className="flex flex-row items-center justify-center w-auto gap-2 pt-5">
        <BsPeople size={30} />
        <div className="relative">
          <input
            onChange={(e) => setSearch(e.target.value)}
            id="search"
            className="
                peer
                w-[400px]
                rounded-md
                text-md
                font-semibold
                py-2
                px-4
                border-b-[2px]
                shadow-md
                outline-none
                transition
                disabled:opacity-70
                disabled:cursor-not-allowed
                
          
          "
          />
          <label
            className={`
                absolute
                text-md
                font-semibold
                duration-150
                transform
                left-0
                top-5
                px-4
                -translate-y-3
                z-10
                origin-[0]
                peer-placeholder-shown:scale-100
                peer-placeholder-shown:translate-y-0
                peer-focus:scale-75
                peer-focus:-translate-y-10
          `}
          >
            Search User
          </label>
        </div>
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

          {studentsInfo
            .filter((value: any) => {
              return search.toLowerCase() === ""
                ? value
                : value.applicationUserTableData.fullName
                    .toLowerCase()
                    .includes(search.toLowerCase());
            })
            .map((item: any) => {
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
