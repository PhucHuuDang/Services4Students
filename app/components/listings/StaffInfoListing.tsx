"use client";

import Image from "next/image";

import { MdOutlineDeleteSweep } from "react-icons/md";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import useDeleteModal from "@/app/hooks/useDeleteModal";

interface StaffInfoListingProps {
  fullName: string;
  email: string;
  date: string;
  id: string;
  // deleteStaff: boolean;
  // setDeleteStaff: (value: boolean) => void;
  openDeleteModal: (id: string) => void;
  setDeleteName: (value: string) => void;
}

const StaffInfoListing: React.FC<StaffInfoListingProps> = ({
  fullName,
  email,
  date,
  id,
  openDeleteModal,
  setDeleteName,
  // deleteStaff,
  // setDeleteStaff,
}) => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const router = useRouter();
  const deleteModal = useDeleteModal();

  const handleSetDeleteId = () => {
    // console.log(id);
    openDeleteModal(id);
    setDeleteName(fullName);
  };

  const onCancel = useCallback(
    (id: string) => {
      setDeleteId(id);

      axios
        .delete("/api/deleteStaff", { data: { id } })
        .then(() => {
          toast.success("Delete staff successfully");
          router.refresh();
        })
        .catch(() => {
          toast.error("Failed to delete staff");
        })
        .finally(() => {
          setDeleteId("");
          // setDeleteStaff(false);
        });
    },
    [router]
  );

  // useEffect(() => {
  //   if (deleteStaff && !deleteModal.isOpen) {
  //     // onCancel(id);
  //     console.log(id);
  //     setDeleteStaff(false);
  //   }
  // }, [onCancel, id, deleteStaff, deleteModal, setDeleteStaff]);

  return (
    <div
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
            // onClick={() => console.log("id: ", id)}
            // onClick={useDeleteModal.onOpen}
            // onClick={() => onCancel(id)}
            // onClick={async () => {
            //   await deleteModal.onOpen();

            //   console.log(id);

            //   // if (deleteStaff) {
            //   //   onCancel(id);
            //   // }
            // }}
            onClick={handleSetDeleteId}
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
      {/* <DeleteModal
        isOpen={isPopupOpen}
        title="Remove a staff"
        secondaryActionLabel="Cancel"
        onClose={useDeleteModal.onClose}
      /> */}
    </div>
  );
};

export default StaffInfoListing;
