"use client";

import Image from "next/image";
import { memo, useCallback } from "react";

import { MdOutlineDeleteSweep } from "react-icons/md";

interface UserInfoListingProps {
  fullName: string;
  email: string;
  date: string;
  id: string;
  openDeleteUserModal: (id: string) => void;
  setDeleteName: (value: string) => void;
  setDeleteMail: (value: string) => void;
}

const UserInfoListing: React.FC<UserInfoListingProps> = ({
  fullName,
  email,
  date,
  id,
  openDeleteUserModal,
  setDeleteName,
  setDeleteMail,
}) => {
  const handleOpenDeleteStudent = useCallback(() => {
    openDeleteUserModal(id);
    setDeleteName(fullName);
    setDeleteMail(email);
  }, [email, fullName, id, openDeleteUserModal, setDeleteName, setDeleteMail]);

  return (
    <div
      onClick={() => console.log("StudentId: ", id)}
      className="
          bg-gray-50
          p-4
          rounded-lg
          cursor-pointer
          hover:bg-gray-100
          hover:shadow-lg
          hover:scale-y-110
          transition
          duration-150
          border-b-[1px]

          "
    >
      <div className="flex flex-row items-center justify-between gap-5">
        <div className="flex flex-row items-center gap-5">
          <Image
            src="/images/avatarPlaceHolder.jpg"
            alt="User"
            width="50"
            height="50"
            className="rounded-full"
          />
          <div className="flex flex-col gap-1">
            <div className="text-lg font-semibold">{fullName}</div>
            <div className="text-sm font-light">{email}</div>
          </div>
        </div>

        <div className="flex flex-row items-center justify-center gap-10">
          <div className="flex flex-col items-end">
            <div className="text-lg font-semibold">Created At</div>
            <div>{new Date(date).toISOString().split("T")[0]}</div>
          </div>
          <div
            onClick={handleOpenDeleteStudent}
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
      </div>
    </div>
  );
};

export default memo(UserInfoListing);
